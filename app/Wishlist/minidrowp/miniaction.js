"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export default async function handelAction(prevstate, formData) {
  // chicking for if have token or no
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  //
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.get("size");

  const product = {
    id,
    image,
    name,
    price,
    old_price,
    category,
    sizes,
    quantity: 1,
  };

  if (actionType === "card") {
    const cartitemId = `${product.id}-${sizes}`;
    if (!sizes || sizes.trim() === "") {
      return { state: true, message: "Select size first" };
    }
    try {
      const checkuser = await fetch(
        `http://localhost:1200/users/${decryption.id}`,
      );
      const cartdata = await checkuser.json();

      if (cartdata) {
        let carts = cartdata.cart || [];
        let wishlist = cartdata.wishlist || [];

        const index = carts.findIndex((item) => item.id === cartitemId);
        wishlist = wishlist.filter((item) => item.id !== product.id);
        if (index !== -1) {
          carts[index].quantity += 1;
        } else {
          carts.push({ ...product, id: cartitemId, quantity: 1 });
        }
        await fetch(`http://localhost:1200/users/${decryption.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ cart: carts, wishlist }),
        });
        revalidateTag("navbar");
      }
    } catch {
      return { message: "Please Check internet Connect ", status: 500 };
    }
  } else if (actionType === "wishlist") {
    try {
      const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
      const user = await res.json();
      if (user) {
        let wishlist = user.wishlist || [];

        const exists = wishlist.some((item) => item.id === product.id);
        console.log(exists);

        if (exists) {
          wishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
          wishlist.push(product);
        }
        const ProductPatch = await fetch(
          `http://localhost:1200/users/${decryption.id}`,
          {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ wishlist }),
          },
        );
        revalidateTag("navbar");
        if (ProductPatch.ok) {
          return { wishliststate: false };
        }
      }
    } catch {
      return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
    }
  }
}
export async function checkCookes() {
  const cookiesstore = await cookies();
  const token = cookiesstore.get("token");
  if (!token) {
    return { success: false, message: "login and try agien" };
  }
  return { success: true };
}
