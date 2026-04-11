"use server"
import NavBar from "./navbar";
import Error from "../error";
export default async function NavAction() {
  try {
    const cartres = await fetch("http://localhost:1200/cart", {
      next: { tags: ["cart"] },
    });

    const washlistres = await fetch("http://localhost:1200/wishlist", {
      next: { tags: ["wishlist"] },
    });

    if (!cartres.ok || !washlistres.ok) {
      throw new Error("السيرفر يعطي استجابة خاطئة");
    }

    const countcart = await cartres.json();
    const countwashlist = await washlistres.json();

    return <NavBar cartCount={countcart} wishlistCount={countwashlist} />;
  } catch (error) {
    throw new Error
  }
}
