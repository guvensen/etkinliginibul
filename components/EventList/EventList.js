import style from './EventList.module.scss';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const dummyData = [
    {
        title : "Sıla Türkiye Turnesi",
        description : "Sıla, sevenlerine eski ve yeni albümden eserler seslendirerek yine.",
        category : "Konser",
        image : "/images/events/event-01.jpg",
        date: "27 Ekim 2022",
        address: "Macfit Çiftehavuzlar Kadıköy-İstanbul",
        price: "150 TL"
    },
    {
        title : "Gençliğin yeni rap festivali: Drill Down",
        description : "Bu haftasonu etkinliği sizi bekliyor.",
        category : "Sergi",
        image : "/images/events/event-02.jpg",
        date: "23 Ocak 2022",
        address: "Pera Müzesi",
        price: "Ücretsiz"
    },
    {
        title : "Karagöz Balıkçı",
        description : "Somut olmayan Kültürel Mirasımız Karagöz'ün ihya dolabından çıkıp Hacivat.",
        category : "Tiyatro",
        image : "/images/events/event-03.jpg",
        date: "01 Mart 2022",
        address: "Pera Müzesi",
        price: "80 TL"
    },
    {
        title : "Gülmek Yakışır: Kaan Sezyum",
        description : "Somut olmayan Kültürel Mirasımız Karagöz'ün ihya dolabından çıkıp Hacivat.",
        category : "Stand-up",
        image : "/images/events/event-04.jpg",
        date: "01 Mart 2022",
        address: "Müze Gazhane",
        price: "80 TL"
    }
]

export default function EventList() {

    const events = dummyData.map((item, index) => {
        return <div key = {"item-"+index} className={style.item}>
            <div className={style.header}>
                <Image
                    src={item.image}
                    alt=""
                    width={375}
                    height={270}
                    layout="responsive"
                />
                <div className={style.category}>
                    <p>{item.category}</p>
                </div>
            </div>
            <div className={style.body}>
                <div className={style.title}>
                    <p>{item.title}</p>
                </div>
                <div className={style.description}>
                    <p>{item.description}</p>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.eventTimeIcon}>
                    <FontAwesomeIcon icon={faCalendarAlt} className={style.icon}/>
                </div>
                <div className={style.eventTimeDescription}>
                    <p className={style.date}>{item.date}</p>
                    <p>{item.address}</p>
                </div>
                <div className={style.actionWrapper}>
                    <div className={style.price}>{item.price}</div>
                    <div className={style.registerBtn}>
                        <p>Bilet Al</p>
                    </div>
                </div>
            </div>
        </div>
    })

    return <div className={style.eventListWrapper}>
        <div className={style.itemContainer}>
            {events}
        </div>
    </div>
}
