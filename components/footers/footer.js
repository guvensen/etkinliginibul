import style from './footer.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
import NewsletterForm from "../NewsletterForm/NewsletterForm";


export default function Footer() {

    const institutionalItems = [
        {
            caption: "Hakkımızda",
            title: "Hakkımızda",
            href: "/",
            target: "_self"
        },
        {
            caption: "Gizlilik Bildirimi",
            title: "Gizlilik Bildirimi",
            href: "/",
            target: "_self"
        },
        {
            caption: "Müşteri Hizmetleri",
            title: "Müşteri Hizmetleri",
            href: "/",
            target: "_self"
        },
        {
            caption: "Kişisel Verilerin Korunması",
            title: "Kişisel Verilerin Korunması",
            href: "/",
            target: "_self"
        },
        {
            caption: "Online Ödeme Koşulları",
            title: "Online Ödeme Koşulları",
            href: "/",
            target: "_self"
        }
    ];

    const helpItems = [
        {
            caption: "Nasıl Bilet Alınır",
            title: "Nasıl Bilet Alınır",
            href: "/",
            target: "_self"
        },
        {
            caption: "Sıkça Sorulan Sorular",
            title: "Sıkça Sorulan Sorular",
            href: "/",
            target: "_self"
        },
        {
            caption: "İptal, İade ve Değişim",
            title: "İptal, İade ve Değişim",
            href: "/",
            target: "_self"
        },
        {
            caption: "Biletinizi Mi Kaybettiniz?",
            title: "Biletinizi Mi Kaybettiniz?",
            href: "/",
            target: "_self"
        }
    ];

    const campaignItems = [
        {
            caption: "Hediye Kart",
            title: "Hediye Kart",
            href: "/",
            target: "_self"
        },
        {
            caption: "Erken Rezervasyon",
            title: "Erken Rezervasyon",
            href: "/",
            target: "_self"
        },
        {
            caption: "Transfer ve Ulaşım Avantajı",
            title: "Transfer ve Ulaşım Avantajı",
            href: "/",
            target: "_self"
        }
    ];

    const socialIcons = [
        {
            title: "Twitter",
            rel: "nofollow",
            href: "https://twitter.com",
            target: "_blank",
            icon: faTwitter,
            status: true
        },
        {
            title: "Youtube",
            rel: "nofollow",
            href: "/",
            target: "_blank",
            icon: faYoutube,
            status: false
        },
        {
            title: "Instagram",
            rel: "nofollow",
            href: "https://www.instagram.com",
            target: "_blank",
            icon: faInstagram,
            status: true
        },
        {
            title: "Facebook",
            rel: "nofollow",
            href: "https://www.facebook.com",
            target: "_blank",
            icon: faFacebook,
            status: true
        }
    ];

    const institutionalList = institutionalItems.map((item, index) => {
        return <li key={index}><a href={item.href} title={item.title} target={item.target}><p>{item.caption}</p></a>
        </li>
    });

    const helpIList = helpItems.map((item, index) => {
        return <li key={index}><a href={item.href} title={item.title} target={item.target}><p>{item.caption}</p></a>
        </li>
    });

    const campaignList = campaignItems.map((item, index) => {
        return <li key={index}><a href={item.href} title={item.title} target={item.target}><p>{item.caption}</p></a>
        </li>
    });

    const socialIconList = socialIcons.map((item, index) => {
        return (item.status) && <a key={index} className={style.faIcon}
                                   href={item.href}
                                   title={item.title}
                                   rel={item.rel}
                                   target={item.target}
        >
            <FontAwesomeIcon icon={item.icon}/>
        </a>
    });


    return <footer className={style.siteFooter}>
        <div className="container">

            <div className={style.footerTop}>
                <div className={style.itemContainer}>
                    <div className={style.itemWrapper}>
                        <div className={style.item}>
                            <h3 className={style.title}>Kurumsal</h3>
                            <ul>{institutionalList}</ul>
                        </div>
                    </div>

                    <div className={style.itemWrapper}>
                        <div className={style.item}>
                            <h3 className={style.title}>Yardım</h3>
                            <ul>{helpIList}</ul>
                        </div>
                    </div>
                    <div className={style.itemWrapper}>
                        <div className={style.item}>
                            <h3 className={style.title}>Kampanyalar</h3>
                            <ul>{campaignList}</ul>
                        </div>
                    </div>
                </div>

                <div className={style.newsletterContainer}>
                    <h3 className={style.title}>E-Bülten Aboneliği</h3>

                    <NewsletterForm
                        inputBgColor="#fbf7f3"
                        buttonBgColor="#f20487"
                        buttonColor="#ffffff"
                    />
                </div>
            </div>

            <div className={style.footerBottom}>
                <div className={style.companyInfo}>
                    <p>
                        © 2022 Etkinliğini Bul - Tüm hakları saklıdır.
                    </p>
                </div>

                <div className={style.socialIconWrapper}>
                    <div className={style.socialIcon}>
                        {socialIconList}
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
