"use server";
import { cookies } from "next/headers";
import NavAction from "../Navbar/NavAction";
import ProfilePage from "./profilepage";
import jwt from "jsonwebtoken";

export async function GetAllUserData() {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;

  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  const getuserdata = await fetch(
    `http://localhost:1200/users/${decryption.id}`,
  );
  if (getuserdata.ok) {
    const userData = await getuserdata.json();
    return userData;
  }
}
export async function Get_Order_Wishlist_num() {
  const Wishlist = await fetch(`http://localhost:1200/wishlist`);
  const wishlistData = await Wishlist.json();
  return wishlistData
}
export default async function products() {
  const user = await GetAllUserData();
  const statistics = await Get_Order_Wishlist_num();

  return (
    <>
      <NavAction />
      <ProfilePage users={user} User_statistics={statistics} />
    </>
  );
}
