import NavBar from "./navbar";

export default async function NavAction() {
  try {
    const cartres = await fetch("http://localhost:1200/cart", {
      next: { tags: ["cart"] },
    });

    const washlistres = await fetch("http://localhost:1200/wishlist", {
      next: { tags: ["wishlist"] },
    });

    // التحقق إذا كان السيرفر رد بشكل سليم (200-299)
    if (!cartres.ok || !washlistres.ok) {
      throw new Error("السيرفر يعطي استجابة خاطئة");
    }

    const countcart = await cartres.json();
    const countwashlist = await washlistres.json();

    return <NavBar cartCount={countcart} washlistCount={countwashlist} />;
  } catch (err) {
    console.error("Connection Refused:", err.message);
    // بترجع القيم فاضيه بدل ما توقع الصفحه كلها
    return <NavBar cartCount={[]} washlistCount={[]} />;
  }
}
