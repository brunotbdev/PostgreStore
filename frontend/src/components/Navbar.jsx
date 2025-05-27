import {
  ShoppingCart,
  ShoppingBag,
  Sun,
  Moon,
  Link,
  Globe,
  useProducts,
  useLang,
  useState,
} from "../assets/exports/navbar.js";

export default function Navbar({ darkMode, setDarkMode }) {
  const { products } = useProducts();
  const { lang, changeLang, htmlText } = useLang();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link aria-label={lang.navbar.aria1} to="/" className="nav-left">
        <ShoppingCart size={34} />
        <h1>PostgreStore</h1>
      </Link>
      <div className="nav-right">
        <div className="dropdown">
          <button
            className="button"
            aria-label={lang.navbar.aria2}
            onClick={() => {
              setIsLangOpen(!isLangOpen);
            }}
          >
            <Globe />
          </button>

          {isLangOpen && (
            <>
              <div
                onClick={() => setIsLangOpen(false)}
                className="out-lang"
              ></div>
              <ul className="lang-box" role="list">
                <li>
                  <button
                    onClick={() => {
                      changeLang("ptbr");
                      setIsLangOpen(false);
                    }}
                    aria-label={lang.navbar.ariaLang1}
                  >
                    <span>🇧🇷</span>Português
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      changeLang("enus");
                      setIsLangOpen(false);
                    }}
                    aria-label={lang.navbar.ariaLang2}
                  >
                    <span>🇺🇸</span>English
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      changeLang("eses");
                      setIsLangOpen(false);
                    }}
                    aria-label={lang.navbar.ariaLang3}
                  >
                    <span>🇪🇸</span>Español
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>

        {darkMode ? (
          <button
            className="button"
            aria-label={lang.navbar.aria3}
            onClick={() => {
              localStorage.setItem("theme", "false");
              setDarkMode(false);
            }}
          >
            <Moon />
          </button>
        ) : (
          <button
            className="button"
            aria-label={lang.navbar.aria4}
            onClick={() => {
              localStorage.setItem("theme", "true");
              setDarkMode(true);
            }}
          >
            <Sun />
          </button>
        )}

        <button className="cart button" aria-label={lang.navbar.aria5}>
          <ShoppingBag />
          {products?.length > 0 && (
            <div className="cart-number">{products.length}</div>
          )}
        </button>
      </div>
    </nav>
  );
}
