import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./page.module.css";
import Footer from "../../footer/Footre";
import Image from "next/image";
import NavAction from "../../../Navbar/NavAction";
async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:1200/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    return data;
  } catch {
    throw new Error("لا يمكن الاتصال بالسيرفر، تأكد من تشغيل json-server");
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.products;
  const product = await getProduct(productId);

  if (!product) notFound(); // لو المنتج مش موجود يودي لصفحة 404

  return (
    <div className={styles.wrapper}>
      <NavAction />
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              className={styles.mainImage}
              alt={product.name}
            />
          </div>

          <div className={styles.imageContainer}>
            {product.image_Hover ? (
              <img
                src={product.image_Hover}
                className={styles.mainImage}
                alt={product.name}
              />
            ) : null}
          </div>

          <div className={styles.imageContainer}>
            {product.image3 ? (
              <img
                src={product.image3}
                className={styles.mainImage}
                alt={product.name}
              />
            ) : product.video ? (
              <video
                src={product.video}
                className={styles.mainImage}
                autoPlay
                muted
                loop
              />
            ) : null}
          </div>

          <div className={styles.imageContainer}>
            {product.image4 && (
              <img
                src={product.image4}
                className={styles.mainImage}
                alt={product.name}
              />
            )}
          </div>
        </div>

        {/* الجزء الأيمن: تفاصيل المنتج */}
        <div className={styles.infoSection}>
          <div className={styles.headerInfo}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.productName}>{product.name}</h1>
            {product.oldPrice ? (
              <span>
                <span className={styles.price}>EGP {product.price}</span>
                <span className={styles.oldPrice}>EGP {product.oldPrice}</span>
              </span>
            ) : (
              <p className={styles.price}>EGP {product.price}</p>
            )}
            <div className={styles.colors_available}>
              {product.url.length} colours available{" "}
            </div>
            <div className={styles.smil_image}>
              {product.url.map((item) => {
                return (
                  <span key={item.id}>
                    <Image
                      src={item.img_url}
                      alt="Logo"
                      width={70}
                      height={70}
                    />
                  </span>
                );
              })}
            </div>
          </div>

          {/* اختيار المقاسات - Static Grid */}
          <div className={styles.sizeSection}>
            <h3 className={styles.sectionTitle}>Select Size</h3>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <button key={size} className={styles.sizeBox}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* أزرار الأكشن */}
          <div className={styles.actions}>
            <button className={styles.addToCartBtn}>
              ADD TO BAG
              <span className={styles.arrowIcon}>→</span>
            </button>
            <button className={styles.wishlistBtn}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={farHeart}
                // icon={isInWishlist ? fasHeart : farHeart}
                // onClick={() => Dispatch(addToWishlist(productItem))}
              />
            </button>
          </div>

          {/* الوصف */}
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>{product.description}</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
