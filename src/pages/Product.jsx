import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { c, useIsMobile, BTN, BTNO, H2, LBL } from "../theme";
import { products, reviews } from "../data";
import { SHOPIFY_IDS, SHOPIFY_HANDLES, fetchProduct, buyNow } from "../shopify";
import { CartContext } from "../components/Cart";

export default function Product({ onCartOpen }) {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const product = products.find((p) => p.id === id) || products[0];

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [shopifyProduct, setShopifyProduct] = useState(null);
  const [error, setError] = useState(null);

  // Fetch real Shopify product data
  useEffect(() => {
    const gid = SHOPIFY_IDS[product.id];
    if (!gid) return;
    fetchProduct(gid)
      .then((data) => {
        if (data) setShopifyProduct(data);
      })
      .catch(() => {});
  }, [product.id]);

  // Find matching variant based on selected size and color
  const getSelectedVariant = () => {
    if (!shopifyProduct) return null;
    const variants = shopifyProduct.variants.edges.map((e) => e.node);
    return (
      variants.find((v) => {
        const sizeOpt = v.selectedOptions.find((o) => o.name === "Size");
        const colorOpt = v.selectedOptions.find((o) => o.name === "Color");
        const sizeMatch = !selectedSize || sizeOpt?.value === selectedSize;
        const colorMatch =
          colorOpt?.value === product.colors[selectedColor] || !colorOpt;
        return sizeMatch && colorMatch;
      }) || variants[0]
    );
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    setLoading(true);
    CartContext.add(
      product,
      selectedSize,
      product.colors[selectedColor],
      quantity,
    );
    setAdded(true);
    setLoading(false);
    if (onCartOpen) onCartOpen();
    setTimeout(() => setAdded(false), 2000);
  };

  const currentPrice = shopifyProduct
    ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount)
        .toFixed(2)
        .replace(".", ",")
    : product.price.toFixed(2).replace(".", ",");

  const productReviews = reviews
    .filter((r) => r.product.includes(product.shortName) || Math.random() > 0.5)
    .slice(0, 3);

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id && (p.cat === product.cat || p.cat === "bundles"),
    )
    .slice(0, 4);

  return (
    <div style={{ fontFamily: "'Archivo',sans-serif", color: c.dark }}>
      {/* Breadcrumb */}
      <div
        style={{
          background: "#fff",
          borderBottom: `1px solid ${c.glL}`,
          padding: `12px ${isMobile ? "16px" : "60px"}`,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontFamily: "'Poppins',sans-serif",
            color: c.gray,
          }}
        >
          <Link to="/" style={{ color: c.gray, textDecoration: "none" }}>
            Home
          </Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link to="/shop" style={{ color: c.gray, textDecoration: "none" }}>
            Shop
          </Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: c.dark }}>{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div
        style={{
          padding: isMobile ? "24px 16px" : "48px 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 24 : 60,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Left: Image gallery */}
        <div>
          <div
            style={{
              background: product.placeholderBg + "55",
              borderRadius: 12,
              height: isMobile ? 280 : 460,
              marginBottom: 12,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {product.badge && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: c.sageD,
                  color: "#fff",
                  fontSize: 11,
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {product.badge}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.images.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    overflow: "hidden",
                    border: `2px solid ${activeImage === i ? c.sageD : c.glL}`,
                    cursor: "pointer",
                    transition: "border 0.15s",
                    position: "relative",
                    background: product.placeholderBg + "55",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product info */}
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: c.sage,
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {product.tag}
          </div>
          <h1
            style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 800,
              color: c.dark,
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: "#F0B429", fontSize: 14 }}>
                  ★
                </span>
              ))}
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: "'Poppins',sans-serif",
                color: c.gray,
              }}
            >
              4.9 (48 reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: c.dark,
              marginBottom: 20,
            }}
          >
            € {currentPrice}
            <span
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: c.gray,
                marginLeft: 8,
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              incl. VAT
            </span>
          </div>

          <p
            style={{
              fontSize: 14,
              fontFamily: "'Poppins',sans-serif",
              color: c.grayD,
              lineHeight: 1.75,
              marginBottom: 24,
              fontWeight: 300,
            }}
          >
            {product.description}
          </p>

          {/* Color picker */}
          {product.colors.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 600,
                  color: c.dark,
                  marginBottom: 10,
                }}
              >
                Color:{" "}
                <span style={{ fontWeight: 400, color: c.grayD }}>
                  {product.colors[selectedColor]}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {product.colorHex.map((hex, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    title={product.colors[i]}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: hex,
                      border: `3px solid ${selectedColor === i ? c.sageD : c.glL}`,
                      cursor: "pointer",
                      transition: "border 0.15s",
                      boxShadow:
                        selectedColor === i ? "0 0 0 2px white inset" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size picker */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 600,
                  color: c.dark,
                }}
              >
                Size:{" "}
                {selectedSize ? (
                  <span style={{ fontWeight: 400, color: c.grayD }}>
                    {selectedSize}
                  </span>
                ) : (
                  <span style={{ fontWeight: 400, color: "#C0504D" }}>
                    Select a size
                  </span>
                )}
              </div>
              <Link
                to="/faq"
                style={{
                  fontSize: 11,
                  color: c.sageD,
                  fontFamily: "'Poppins',sans-serif",
                  textDecoration: "none",
                }}
              >
                Size guide ›
              </Link>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 4,
                    border: `1.5px solid ${selectedSize === size ? c.sageD : c.glL}`,
                    background: selectedSize === size ? c.sageD : "#fff",
                    color: selectedSize === size ? "#fff" : c.dark,
                    fontSize: 12,
                    fontFamily: "'Poppins',sans-serif",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                color: c.dark,
              }}
            >
              Qty:
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${c.glL}`,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: 36,
                  height: 36,
                  background: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  color: c.dark,
                }}
              >
                −
              </button>
              <span
                style={{
                  width: 40,
                  textAlign: "center",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: 36,
                  height: 36,
                  background: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  color: c.dark,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                background: "#fff0f0",
                border: "1px solid #ffcccc",
                borderRadius: 6,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 13,
                fontFamily: "'Poppins',sans-serif",
                color: "#C0504D",
              }}
            >
              {error}
            </div>
          )}

          {/* Add to cart / Buy now */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 20,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <button
              onClick={handleAddToCart}
              disabled={loading}
              style={{
                ...BTN,
                flex: 1,
                textAlign: "center",
                fontSize: 13,
                padding: "15px 0",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading
                ? "Adding..."
                : added
                  ? "✓ Added to cart!"
                  : "Add to Cart"}
            </button>
            <button
              style={{
                ...BTNO,
                flex: isMobile ? 1 : 0,
                textAlign: "center",
                padding: "15px 20px",
              }}
            >
              ♡
            </button>
          </div>

          {!SHOPIFY_IDS[product.id] && (
            <div
              style={{
                fontSize: 12,
                fontFamily: "'Poppins',sans-serif",
                color: c.gray,
                marginBottom: 16,
                fontStyle: "italic",
              }}
            >
              ℹ️ Checkout coming soon for this product.
            </div>
          )}

          {/* Trust signals */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8,
              marginBottom: 24,
            }}
          >
            {[
              { icon: "🚚", text: "Free shipping\n> €59" },
              { icon: "↩️", text: "30-day\nreturns" },
              { icon: "🌿", text: "Chemical-\nfree" },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  background: c.off,
                  borderRadius: 6,
                  padding: "10px 8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                    lineHeight: 1.4,
                    whiteSpace: "pre-line",
                  }}
                >
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div
            style={{ background: c.off, borderRadius: 8, padding: "16px 18px" }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: c.dark,
                marginBottom: 10,
              }}
            >
              Key features
            </div>
            {product.features.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span style={{ color: c.sageD, fontSize: 12 }}>✓</span>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          borderTop: `1px solid ${c.glL}`,
          borderBottom: `1px solid ${c.glL}`,
          background: "#fff",
          padding: `0 ${isMobile ? "16px" : "60px"}`,
        }}
      >
        <div style={{ display: "flex", gap: 0 }}>
          {["description", "details", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "16px 24px",
                fontFamily: "'Poppins',sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "capitalize",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab ? c.sageD : "transparent"}`,
                color: activeTab === tab ? c.sageD : c.grayD,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              {tab === "reviews"
                ? `Reviews (${productReviews.length})`
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: isMobile ? "24px 16px" : "40px 60px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {activeTab === "description" && (
          <div>
            <p
              style={{
                fontSize: 14,
                fontFamily: "'Poppins',sans-serif",
                color: c.grayD,
                lineHeight: 1.9,
                marginBottom: 20,
                fontWeight: 300,
              }}
            >
              {product.description}
            </p>
            <p
              style={{
                fontSize: 14,
                fontFamily: "'Poppins',sans-serif",
                color: c.grayD,
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              Bug Away is designed to be worn as a comfortable base layer under
              your regular outdoor clothing. The lightweight noseeum-grade mesh
              creates a physical barrier without adding bulk or weight.
            </p>
          </div>
        )}
        {activeTab === "details" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: c.dark,
                  marginBottom: 12,
                }}
              >
                Materials
              </div>
              {[
                ["Fabric", "100% nylon noseeum-grade mesh"],
                ["Weight", "< 40g (pants), < 45g (jacket)"],
                ["Mesh size", "< 0.6mm openings"],
                ["UV protection", "UPF 30+"],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${c.glL}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                    }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.dark,
                      fontWeight: 500,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: c.dark,
                  marginBottom: 12,
                }}
              >
                Care
              </div>
              {[
                ["Washing", "Machine wash 30°C gentle"],
                ["Drying", "Air dry only, no tumble dry"],
                ["Ironing", "Do not iron directly on mesh"],
                ["Storage", "Fold flat, cool dry place"],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: `1px solid ${c.glL}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.gray,
                    }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'Poppins',sans-serif",
                      color: c.dark,
                      fontWeight: 500,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            {productReviews.map((r, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${c.glL}`,
                  paddingBottom: 20,
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: "#F0B429", fontSize: 14 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: "'Poppins',sans-serif",
                    color: c.grayD,
                    lineHeight: 1.75,
                    marginBottom: 10,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  "{r.text}"
                </p>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.dark }}>
                  {r.name}{" "}
                  <span style={{ fontWeight: 300, color: c.gray }}>
                    — {r.loc} · {r.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            padding: isMobile ? "24px 16px" : "48px 60px",
            background: c.off,
            borderTop: `1px solid ${c.glL}`,
          }}
        >
          <h2 style={{ ...H2, marginBottom: 24 }}>You might also like</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
              gap: isMobile ? 12 : 20,
            }}
          >
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `1px solid ${c.glL}`,
                  }}
                >
                  <div
                    style={{
                      height: isMobile ? 120 : 160,
                      background: p.placeholderBg + "55",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: c.dark,
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: c.grayD,
                        fontFamily: "'Poppins',sans-serif",
                      }}
                    >
                      € {p.price.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
