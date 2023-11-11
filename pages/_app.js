import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #eeeeee;
  }
`

export default function App({Component, pageProps}) {
    return (
        <>
            <GlobalStyles/>
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </>
    )
}
