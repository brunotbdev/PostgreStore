import {
  axios,
  RefreshCw,
  CirclePlus,
  Package,
  useEffect,
  useState,
  Product,
  AddProduct,
  toast,
  useProducts,
  useLang,
} from "../assets/exports/homePage.js";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, setProducts } = useProducts();
  const { lang } = useLang();

  function getAllProducts(refresh) {
    axios
      .get("/api/products")
      .then(function (res) {
        setProducts(res.data.data);
        if (refresh === true) {
          toast(`${lang.toast.productRefreshed}`, {
            duration: 2000,
            position: "top-center",
            className: "toast",
            icon: "🔄",
          });
        }
      })
      .catch(function () {
        toast.error(`${lang.toast.error}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
      });
  }

  useEffect(() => {
    getAllProducts(false);
  }, []);

  return (
    <>
      <div className="toolbar">
        <button
          onClick={() => setIsModalOpen(true)}
          aria-label={lang.homepage.aria1}
          className="add"
        >
          <CirclePlus />
          {lang.homepage.button1}
        </button>
        <button
          onClick={() => getAllProducts(true)}
          aria-label={lang.homepage.aria2}
          className="button"
        >
          <RefreshCw />
        </button>
      </div>
      {isModalOpen && (
        <AddProduct
          getAllProducts={getAllProducts}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {products?.length > 0 ? (
        <>
          <div className="grid-container">
            <div className="product-grid">
              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  getAllProducts={getAllProducts}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="not-found-container">
          <div className="not-found">
            <Package className="not-found-icon" size={64} />
            <h1>{lang.homepage.notFoundTitle}</h1>
            <p>{lang.homepage.notFoundDesc}</p>
          </div>
        </div>
      )}
    </>
  );
}
