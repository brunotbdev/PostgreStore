import {
  X,
  ShoppingBag,
  CirclePlus,
  DollarSign,
  Image,
  useRef,
  useState,
  axios,
  FocusTrap,
  toast,
  savePrice,
  useLang,
} from "../assets/exports/addProduct.js";

export default function AddProduct({ setIsModalOpen, getAllProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    price_cents: 0,
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef(null);
  const { lang } = useLang();

  async function addProduct(e) {
    e.preventDefault();
    setIsLoading(() => setIsLoading(true));
    let isImage;

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

    axios
      .post("/api/products", formData)
      .then(function () {
        setIsLoading(() => setIsLoading(false));
        toast.success(`${lang.toast.productAdded}`, {
          duration: 2000,
          position: "top-center",
          className: "toast",
        });
        setIsModalOpen(() => setIsModalOpen(false));
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
    <FocusTrap>
      <div onClick={() => setIsModalOpen(false)} className="out">
        <div onClick={(e) => e.stopPropagation()} className="add-product">
          <button
            aria-label={lang.addproduct.aria1}
            onClick={() => setIsModalOpen(false)}
            className="close button"
          >
            <X />
          </button>

          <form onSubmit={addProduct} className="form">
            <h2>{lang.addproduct.formTitle}</h2>
            <label htmlFor="name">
              {lang.addproduct.label1}
              <div className="input-container">
                <ShoppingBag className="input-icon" />
                <input
                  autoComplete="off"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={lang.addproduct.placeholder1}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </label>

            <label htmlFor="number">
              {lang.addproduct.label2}
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
                  placeholder={lang.addproduct.placeholder2}
                  required
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
              {lang.addproduct.label3}
              <div className="input-container">
                <Image className="input-icon" />
                <input
                  autoComplete="off"
                  type="url"
                  name="image"
                  id="image"
                  placeholder={lang.addproduct.placeholder3}
                  pattern="https://.*"
                  required
                  ref={urlRef}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </label>

            <div className="form-buttons">
              <button
                type="reset"
                aria-label={lang.addproduct.aria2}
                onClick={() => setIsModalOpen(false)}
                className="form-cancel"
              >
                {lang.addproduct.button2}
              </button>
              <button
                aria-label={lang.addproduct.aria3}
                disabled={
                  !formData.name || !formData.price_cents || !formData.image
                }
                type="submit"
                className={isLoading ? "form-submit loading" : "form-submit"}
              >
                <CirclePlus className="add-icon" size={22} />
                {lang.addproduct.button3}
              </button>
            </div>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
}
