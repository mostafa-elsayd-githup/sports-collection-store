"use server";

import { revalidateTag } from "next/cache";

export const handelAction = async (prevstate, formData) => {
  const buttonType = formData.get("intent");
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
    quantity: 1,
  };
  if (buttonType === "cart") {
    await fetch(`http://localhost:1200/cart`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    await fetch(`http://localhost:1200/wishlist/${id}`, {
      method: "DELETE",
    });
    revalidateTag("cart");
    revalidateTag("wishlist");
  }
  if (buttonType === "wishlist") {
    await fetch(`http://localhost:1200/wishlist/${id}`, {
      method: "DELETE",
    });
    revalidateTag("wishlist");
  }
};
