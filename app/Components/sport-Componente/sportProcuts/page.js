import NotFoundComponent from "../../Hero/NotFoundComponent";
import Link from "next/link";
import styles from "./sportproducts.module.css";
import SingleProduct from "./SingleProduct";
import { Container } from "react-bootstrap";
import NavAction from "../../../Navbar/NavAction";

async function getwishlist() {
  try {
    const res = await fetch("http://localhost:1200/wishlist", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// 2. تعديل دالة getdata لتجلب البيانات مباشرة من MongoDB
async function getdata(category) {
  try {
    const res = await fetch(`http://localhost:1200/products?type=${category}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("")
  }
}

async function Product({ searchParams }) {
  const queryParams = await searchParams;
  const categoryKey = queryParams.type;

  // استدعاء البيانات مباشرة
  const data = await getdata(categoryKey);
  const wishlistdata = await getwishlist();

  if (!data || data.length === 0) {
    return (
      <>
        <NavAction />
        <NotFoundComponent />
      </>
    );
  }

  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        <div className={styles.text}>
          <span className={styles.spans}>
            <Link
              className={styles.span}
              href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts?club=tshirt"
            >
              Sport /
            </Link>
            <span>
              {" "}
              <Link className={styles.span} href="">
                Gym & Training
              </Link>
            </span>
          </span>
          <h1 className={styles.title}>
            Gym and Training{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              [ {data.length} ]
            </span>
          </h1>
        </div>
        <div className={styles.products}>
          {data.map((item) => {
            const isfevorite = wishlistdata.some((wish) => wish.id === item.id);
            return (
              <SingleProduct
                key={item.id} 
                productItem={item}
                isfevorite={isfevorite}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Product;
