"use client";
import { Container } from "react-bootstrap";
import styles from "./Products.module.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"; // قلب فارغ (Regular)
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons"; // قلب ممتلئ (Solid)
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"; // شنطة تسوق (Solid)
import { useActionState, useState } from "react";
import { handelAction } from "./wishliestAction";
import Link from "next/link";

function Products({ wishlist }) {
  const [typeButton, settypeButoon] = useState("");
  const intialstate = { massage: "", state: null };
  const [state, formAction, pending] = useActionState(
    handelAction,
    intialstate,
  );
  return (
    <div>
      <Container className={styles.wishlist_page}>
        {/* loader */}
        {pending && (
          <div className={styles.overlay_loader}>
            <div className={styles.halfCircleLoader}></div>
          </div>
        )}
        <h2 className={styles.bag_title}>
          wishlist
          <span className={styles.item_count}>
            ({wishlist?.length} Unreserved Item)
          </span>
        </h2>

        {wishlist.length > 0 ? (
          <div className={styles.wishlist_grid}>
            {wishlist.map((product) => (
              <Card className={styles.card} key={product.id}>
                <div className={styles.image_container}>
                  <Card.Img
                    name="image"
                    className={styles.image}
                    src={product.image}
                    alt={product.name}
                  />
                  <form
                    action={formAction}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.overlay}
                  >
                    <input type="hidden" name="id" value={product.id || ""} />
                    <input
                      type="hidden"
                      name="name"
                      value={product.name || ""}
                    />
                    <input
                      type="hidden"
                      name="price"
                      value={product.price || ""}
                    />
                    <input
                      type="hidden"
                      name="image"
                      value={product.image || ""}
                    />

                    <input
                      type="hidden"
                      name="old_price"
                      value={product.old_price || ""}
                    />
                    <input
                      type="hidden"
                      name="category"
                      value={product.category || ""}
                    />
                    <input type="hidden" name="sizes" value={product.sizes || ""} />
                    <input type="hidden" name="intent" value={typeButton || ""} />
                    <button
                      name="intent"
                      onMouseDown={() => settypeButoon("wishlist")}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#000",
                        opacity: pending ? 0.1 : 1,
                      }}
                    >
                      <FontAwesomeIcon
                        className={styles.Heart_icon}
                        icon={fasHeart}
                      />
                    </button>
                    <button
                      name="intent"
                      onMouseDown={() => settypeButoon("cart")}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#000",
                        opacity: pending ? 0.1 : 1,
                      }}
                    >
                      <FontAwesomeIcon
                        className={styles.shopping_icon}
                        icon={faBagShopping}
                      />
                    </button>
                  </form>
                </div>
                <Card.Body className="p-3">
                  {product.Inventory === 0 ? (
                    <span className={styles.little}>
                      <span className={styles.word}>OUT</span>
                    </span>
                  ) : product.Inventory <= 5 ? (
                    <span className={styles.little}>
                      <span className={styles.word}>LOW</span>
                    </span>
                  ) : null}
                  <Link
                    href={`/Components/what_is_hot_componante/terrex/${product.id}`}
                  >
                    <h5 className={styles.name}>{product.name}</h5>
                  </Link>
                  {/* price*/}
                  <span
                    className={`${styles.price} ${
                      product.oldPrice ? styles.price_red : ""
                    }`}
                  >
                    EGP {product.price}
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className={styles.old_price}>
                        EGP {product.oldPrice}
                      </span>
                      <input
                        type="hidden"
                        name="old_price"
                        value={product.oldPrice}
                      />
                    </>
                  )}
                  <p className={styles.category}>{product.category}</p>
                  <p className={styles.colors}>
                    {product.url?.length ? `Colors: ${product.url.length}` : ""}
                  </p>
                  <p className={styles.made}>
                    {product.made ? product.made : ""}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div className={styles.empty_state}>
            <h3>YOUR WISHLIST IS EMPTY</h3>
            <p>Items added to your wishlist will be saved here.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Products;
