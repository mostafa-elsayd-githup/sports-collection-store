import CartPage from "./child";
import NavAction from "../Navbar/NavAction";

export async function getdata() {
  const res = await fetch("http://localhost:1200/cart", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
const page = async ()=>{
  const data = await getdata();

    return(
        <>
        <NavAction/>
        <CartPage card={data}/>
        </>
    )
}
export default page