import {
  useState,
  Routes,
  Route,
  Navbar,
  HomePage,
  ProductPage,
  Toaster,
  ProductsProvider,
  LanguageProvider,
} from "./assets/exports/app.js";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) ??
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  JSON.parse(localStorage.getItem("theme")) ??
    localStorage.setItem("theme", JSON.stringify(darkMode));

  return (
    <ProductsProvider>
      <LanguageProvider>
        <div className={darkMode ? "container dark" : "container light"}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </LanguageProvider>
    </ProductsProvider>
  );
}
