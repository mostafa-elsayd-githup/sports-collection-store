"use server"
import NavAction from "../Navbar/NavAction";
import Footer from "../Components/footer/Footre";
import Products from "./wiahlist";
const getData = async () => {
  const res = await fetch("http://localhost:1200/wishlist", {
    next: { revaldata: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (data) return data;
  
};
async function page() {
  const wishlist = await getData() || [];

  return (
    <>
      <NavAction />
      <Products wishlist={wishlist} />
      <Footer />
    </>
  );
}
export default page;
