import Head from 'next/head';
import Header from '../headers/header';
import Footer from "../footers/footer";

export default function DefaultLayout({ children }) {
    return <>
        <Head>
            <title>Etkinliğini Bul</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header/>
        { children }
        <Footer/>
    </>
}
