import Head from "next/head";
import classes from "./layout.module.css";
import Header from "../header";
import Navigation from "../navigation";
import AppWrapper from "../../ui/AppWrapper";
import SnackbarController from "../snackbar";
import Footer from "../footer/footer"

export default function Layout({
  children,
  configure,
  backClicked,
  changeTheme,
  title
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Inter/Inter-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="description" content="Dextopia allows low cost, near 0 slippage trades on uncorrelated or tightly correlated assets built on Polygon." />
        <meta name="og:title" content="Dextopia" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* <>
            <Header />
            {props.children}
            <Footer />
      </> */}
      <>
        {!configure && (
          <Header backClicked={backClicked} changeTheme={changeTheme} title={ title } />
        )}
        <SnackbarController />
        {children}
        </>
    </>
  );
}
