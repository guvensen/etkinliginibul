import style from './EventList.module.scss';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


export default function EventList({events, categories, places}) {

    const getCategory = (id) => {
        let index = categories.findIndex(item => item.id === id)
        return categories[index];
    }

    const getPlace = (id) => {
        let index = places.findIndex(item => item.id === id)
        return places[index];
    }


    const items = events.map((item, index) => {
        let category = getCategory(item.category);
        let palace = getPlace(item.place);

        let address = palace.title + " - " + palace.address.district +"/"+ palace.address.province;
        let price = item.price.isFree ? "Ücretsiz" : "100.00 TL";
        let slug = palace.slug+"/"+item.slug;

        return <div key = {"item-"+index} className={style.item}>
            <div className={style.header}>
                <Image
                    src={item.photos.thumbnail}
                    alt=""
                    width={375}
                    height={270}
                    layout="responsive"
                />
                <div className={style.category}>
                    <p>{category.title}</p>
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
                    <p className={style.date}>{item.startDate}</p>
                    <p>{address}</p>
                </div>
                <div className={style.actionWrapper}>
                    <div className={style.price}>{price}</div>
                    <div className={style.registerBtn}>
                        <a href={slug}><p>Bilet Al</p></a>
                    </div>
                </div>
            </div>
        </div>
    })

    return <div className={style.eventListWrapper}>
        <div className={style.itemContainer}>
            {items}
        </div>
    </div>
}
