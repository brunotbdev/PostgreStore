import {
  axios,
  Link,
  toast,
  formatCurrency,
  SquarePen,
  Trash2,
  useLang,
} from "../assets/exports/products.js";

export default function Products({ product, getAllProducts }) {
  const { lang } = useLang();

  function deleteProduct() {
    axios
      .delete(`/api/products/${product.id}`)
      .then(function () {
        toast(`${lang.toast.productDeleted}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
          icon: "🗑️",
        });
        getAllProducts();
      })
      .catch(function () {
        toast.error(`${lang.toast.error}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
      });
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="info">
        <h2 title={product.name}>{product.name}</h2>
        <h3>R$ {formatCurrency(product.price_cents)}</h3>
        <div className="info-buttons">
          <Link
            aria-label={lang.product.aria1}
            to={`product/${product.id}`}
            className="product-button edit"
          >
            <SquarePen size={14} />
          </Link>
          <button
            aria-label={lang.product.aria2}
            onClick={deleteProduct}
            className="product-button delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
