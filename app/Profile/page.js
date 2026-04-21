"use server";
import { cookies } from "next/headers";
import NavAction from "../Navbar/NavAction";
import ProfilePage from "./profilepage";
import jwt from "jsonwebtoken";

const cookiestore = await cookies();
const token = cookiestore.get("token")?.value;
console.log(token);

const decryption = jwt.verify(token, process.env.JWT_SECRET);
export async function GetAll_UserData() {
  const getuserdata = await fetch(
    `http://localhost:1200/users/${decryption.id}`,
  );
  if (getuserdata.ok) {
    const userData = await getuserdata.json();
    return userData;
  }
}
export async function Get_Wishlist_num() {
  const Wishlist = await fetch(`http://localhost:1200/users/${decryption.id}`);
  const wishlistData = await Wishlist.json();
  return wishlistData;
}
export default async function products() {
  const user = await GetAll_UserData();
  const statistics = await Get_Wishlist_num();


  return (
    <>
      <NavAction />
      <ProfilePage users={user} User_statistics={statistics} />
    </>
  );
}
