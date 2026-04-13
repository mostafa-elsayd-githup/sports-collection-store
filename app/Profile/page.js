"use server";
import { cookies } from "next/headers";
import NavAction from "../Navbar/NavAction";
import ProfilePage from "./profilepage";
import jwt from "jsonwebtoken";

export async function GetAllData(){
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

export default async function products() {
 const user = await GetAllData()
 
  return (
    <>
      <NavAction />
      <ProfilePage users={user} />
    </>
  );
}
