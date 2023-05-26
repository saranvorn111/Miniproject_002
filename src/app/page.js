import CardCategories from "@/components/CardCategories";
import CardComponent from "@/components/CardComponent";
import CardUserComponent from "@/components/CardUserComponent";
import SlideShow from "@/components/SlideShow";


//fetch User
export async function getUser() {
  const res = await fetch("https://api.escuelajs.co/api/v1/users?limit=8");
  const data = res.json();
  return data;
}

//fetch Api category
export async function getCategory() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/categories?limit=50"
  );
  const data = res.json();
  return data;
}

//fetch Api product
export async function getData() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?limit=20&offset=0",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}
export default async function Home() {
  const products = await getData();
  const categories = await getCategory();
  const users = await getUser();
  return (
    <div className="bg-neutral-100">
      <div className=" flex flex-wrap items-center justify-between mb-4 pt-6 pb-5">
        <SlideShow/>
      </div>
      <div className="">
      <div>
        <h1
          style={{ color: "black" }}
          className="text-3xl font-bold text-center pt-10 "
        >
          Users
        </h1>
        <div className="divide-transparent"></div>
        <div className="p-24 flex flex-wrap items-center justify-between mb-4 pt-10 pb-10">
          {users.map((user) => (
            <CardUserComponent
              key={user.id}
              title={user.name}
              image={user.avatar}
            />
          ))}
        </div>
      </div> 
      <h1
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="text-3xl font-bold "
        >
          Category
        </h1>      
      <div className="p-24 flex  flex-wrap items-center justify-between mb-4 gap-10 pb-10 pt-10">
        {categories.map((category) => (
          <CardCategories
            key={category.id}
            title={category.name}
            image={category.image}
          />
        ))}
      </div>           

      <div>
        <h1
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          className="text-3xl font-bold "
        >
          Products
        </h1>
        <div className="w-{80%} mx-auto p-24 flex min-h-screen flex-wrap items-center justify-around mb-4 pt-10">
          {products.map((product) => (
            <CardComponent
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.images[0]}
            />
          ))}          
        </div>
      </div>
      </div>
    </div>
  );
}
