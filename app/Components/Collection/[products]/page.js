"use server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faCreditCard,
  faArrowRotateLeft,
  faLock,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faTruck,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./page.module.css";
import NavAction from "../../../Navbar/NavAction";
import Footer from "../../footer/Footre";
import Image from "next/image";
async function getProduct(id) {
  try {
    const res = await fetch(
      `http://localhost:1200/products/${id}`,
      {
        // next: { revalidate: 60 },
        cache: "no-cache",
      },
    );
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
  if (!product) notFound();
  const fillWidth = (product.rating / 5) * 100;

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
              {product.url.length} colours available
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
              <span className={styles.arrowIcon}>
                <FontAwesomeIcon icon={faRightLong} />
              </span>
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

          <div className={styles.ratingWrapper}>
            <div className={styles.starsContainer}>
              {/* النجوم الرمادية */}
              <div className={styles.starsEmpty}>★★★★★</div>

              {/* النجوم الذهبية المتحركة */}
              <div
                className={styles.starsFilled}
                style={{ width: `${fillWidth}%` }}
              >
                ★★★★★
              </div>
            </div>

            <span className={styles.ratingText}>
              {product.rating || 0}
              <span className={styles.reviewsCount}>
                ({product.reviews_count || 0} reviews)
              </span>
            </span>
          </div>
          {/* description */}
          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>{product.description}</h3>
          </div>
          <div className={styles.trustSection}>
            <div className={styles.trustItem}>
              <FontAwesomeIcon className={styles.icnodis} icon={faTruck} />
              <span className={styles.trustText}>
                Free Delivery over EGP 999
              </span>
            </div>

            <div className={styles.trustItem}>
              <FontAwesomeIcon
                className={styles.icnodis}
                icon={faClockRotateLeft}
              />
              <span className={styles.trustText}>
                Hassle Free 30 days returns
              </span>
            </div>

            <div className={styles.trustItem}>
              <FontAwesomeIcon className={styles.icnodis} icon={faCreditCard} />
              <span className={styles.trustText}>
                Cash On Delivery Available : Standard courier delivery (4 to 5
                days).
              </span>
            </div>
            <div className={styles.trustItem}>
              <FontAwesomeIcon icon={faLock} className={styles.icnodis} />
              <span className={styles.trustText}>Secure transactions</span>
            </div>
            <div className={styles.trustItem}>
              <FontAwesomeIcon
                className={styles.icnodis}
                icon={faArrowRotateLeft}
              />
              <span className={styles.trustText}>
                ValU: Up to 3 months, 0% Interest
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
