"use server"
import { revalidateTag } from "next/cache";
export async function handelAction(prevsate, formData) {
  const button = formData.get("buttontype");
    const id = formData.get("id");
  const image = formData.get("image");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.get("sizes");
    const product = {
    id,
    image,
    name,
    price,
    old_price,
    category,
    sizes,
  };
  if (button === "cart") {
    try {
         const chickacer = await fetch(`http://localhost:1200/cart/${product.id}`);
         if (chickacer.ok) {
           const updata = Number(chickacer.quantity || 1) + 1;
           await fetch(`http://localhost:1200/cart/${product.id}`, {
             method: "PATCH",
             body: JSON.stringify({ quantity: updata }),
             headers: { "content-type": "application/json" },
           });
         } else {
           await fetch(`http://localhost:1200/cart`, {
             method: "POST",
             body: JSON.stringify({ ...product, quantity: 1 }),
             headers: { "contente-type": "application/json" },
           });
           revalidateTag("cart");
         }
       } catch {
         return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
       }
    } else if (button === "wishlist") {
       try {
         const wishlist = await fetch(
           `http://localhost:1200/wishlist/${product.id}`);
         if (wishlist.ok) {
           await fetch(`http://localhost:1200/wishlist/${product.id}`, {
             method: "DELETE",
           });
   
           revalidateTag("wishlist");
         } else {
           const add = await fetch("http://localhost:1200/wishlist", {
             method: "POST",
             body: JSON.stringify(product),
             headers: { "content-type": "application/json" },
           });
           revalidateTag("wishlist");
         }
       } catch {
         // في حال تعذر الاتصال بالسيرفر أصلاً
         return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
       }
     }
}
