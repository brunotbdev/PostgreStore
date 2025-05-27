import {
  Link,
  ArrowLeft,
  ShoppingBag,
  Trash2,
  DollarSign,
  Image,
  Save,
  axios,
  useEffect,
  useState,
  useRef,
  useParams,
  useNavigate,
  toast,
  savePrice,
  useLang,
} from "../assets/exports/productPage";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: null,
    price_cents: null,
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef(null);
  const { lang } = useLang();

  let defaultValue = {
    name: formData.name ? formData.name : `${product?.name}`,
    price_cents: formData.price_cents
      ? formData.price_cents
      : Number(`${product?.price_cents}`),
    image: formData.image ? formData.image : `${product?.image}`,
  };

  let { id } = useParams();
  let navigate = useNavigate();

  function getProduct() {
    axios
      .get(`/api/products/${id}`)
      .then(function (res) {
        setProduct(res.data.data[0]);
      })
      .catch(function () {
        toast.error(`${lang.toast.error}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
      });
  }

  async function updateProduct(e) {
    e.preventDefault();
    setIsLoading(() => setIsLoading(true));
    let isImage;

    if (formData.image !== null) {
      await axios
        .get(`/api/products/check/image?url=${formData.image}`)
        .then(function (res) {
          isImage = res.data.valid;
        })
        .catch(function () {
          toast.error(`${lang.toast.error}`, {
            duration: 2000,
            position: "top-center",
            className: "toast",
          });
        });

      if (isImage === false) {
        setIsLoading(() => setIsLoading(false));
        urlRef.current.value = "";
        toast.error(`${lang.toast.linkNotImage}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
        return;
      }
    }

    axios
      .put(`/api/products/${id}`, defaultValue)
      .then(function () {
        setIsLoading(() => setIsLoading(false));
        toast(`${lang.toast.productUpdated}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
          icon: "💾",
        });
        navigate(-1);
      })
      .catch(function () {
        toast.error(`${lang.toast.error}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
      });
  }

  function deleteProduct() {
    axios
      .delete(`/api/products/${id}`)
      .then(function () {
        toast(`${lang.toast.productDeleted}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
          icon: "🗑️",
        });
        navigate(-1);
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
    getProduct();
  }, []);

  return (
    <div className="product-page">
      <div className="product-page-container">
        <Link aria-label={lang.productpage.aria1} className="back" to="/">
          <ArrowLeft />
          {lang.productpage.button1}
        </Link>
        <div className="product-details">
          <img src={product?.image} alt={product?.name} />
          <form onSubmit={updateProduct} className="form-update">
            <h2>{lang.productpage.formTitle}</h2>
            <label htmlFor="name">
              {lang.productpage.label1}
              <div className="input-container">
                <ShoppingBag className="input-icon" />
                <input
                  autoComplete="off"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={lang.productpage.placeholder1}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </label>

            <label htmlFor="number">
              {lang.productpage.label2}
              <div className="input-container">
                <DollarSign className="input-icon" />
                <input
                  step="0.01"
                  autoComplete="off"
                  inputMode="decimal"
                  lang="pt-BR"
                  type="number"
                  name="number"
                  id="number"
                  placeholder={lang.productpage.placeholder2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price_cents: savePrice(e.target.value),
                    })
                  }
                />
              </div>
            </label>

            <label htmlFor="image">
              {lang.productpage.label3}
              <div className="input-container">
                <Image className="input-icon" />
                <input
                  autoComplete="off"
                  type="url"
                  name="image"
                  id="image"
                  placeholder={lang.productpage.placeholder3}
                  pattern="https://.*"
                  ref={urlRef}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </label>

            <div className="form-update-buttons">
              <button
                type="button"
                aria-label={lang.productpage.aria2}
                onClick={deleteProduct}
                className="form-delete"
              >
                <Trash2 className="delete-icon" size={22} />
                {lang.productpage.button2}
              </button>
              <button
                disabled={
                  !formData.name && !formData.price_cents && !formData.image
                }
                type="submit"
                aria-label={lang.productpage.aria3}
                className={isLoading ? "form-save loading" : "form-save"}
              >
                <Save className="save-icon" size={22} />
                {lang.productpage.button3}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
