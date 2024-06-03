import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import { RecoilRoot } from "recoil";
import Document from "./pages/document";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

const TestPage = () => {
  const test = `
# test

## test

### test

* test
  * test
  *
---
  `;

  return (
    <MarkdownPreview
      // remarkPlugins={[remarkGfm]}
      // rehypePlugins={[rehypeHighlight]}
      source={test}
    />
  );
};

export default App;
