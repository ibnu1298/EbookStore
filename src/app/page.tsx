import CatalogEbookLayouts from "./components/Layouts/CatalogEbookLayouts";
const getEbook = async (token: string) => {
  if (token != undefined) {
    const res = await fetch(
      `https://baretstorewebapi.azurewebsites.net/api/Ebook/OrderByName`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const response = await res.json();

    if (!response.isSucceeded) {
      return { response };
    }

    return response;
  }
};
export default async function Home() {
  // const [login, setLogin] = useState(true);
  // const [loginOrRegisModal, setLoginOrRegisModal] = useState("hidden");
  // const loginOrRegisFunc = () => {
  //   if (login) {
  //   }
  // };
  const response = await getEbook("dwada");
  return (
    <div className="flex justify-center mt-14">
      <CatalogEbookLayouts ebooks={response.ebooks} />
    </div>
  );
}
