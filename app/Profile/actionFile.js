"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export default async function logoutfun(prevent, dataform) {
  const buttontype = dataform.get("buttontype");

  if (buttontype === "logout") {
    const cookiestore = await cookies();
    const token = cookiestore.get("token")?.value;
   cookiestore.delete("token")
   redirect("/login")
  }
}
