"use server"
import { revalidatePath } from "next/cache";
const HandleAction = async (prevstate, formData) => {
  const actionTypeState = formData.get("intent");
  const id = formData.get("id");
  if (actionTypeState === "delete") {
    const res = await fetch(`http://localhost:1200/cart/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/CardPage");
  } else if (actionTypeState === "clear") {
        const res = await fetch("http://localhost:1200/cart");
        const items = await res.json();
        const clear = items.map((e)=>{
            fetch(`http://localhost:1200/cart/${e.id}`, { method: "DELETE" })
        })
        await Promise.all(clear);
     revalidatePath("/CardPage");
    //  revalidatePath("/", "layout");
  }
};
export default HandleAction;
