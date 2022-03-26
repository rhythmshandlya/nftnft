import Layout from "@components/layout/Base";
import "@styles/globals.css";
import "animate.css";
import "@styles/modal/side-modal.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
