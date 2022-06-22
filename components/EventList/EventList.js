import style from './EventList.module.scss';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {dateFormat} from "../dateFormat/dateFormat";


export default function EventList({events, categories, places, provinces}) {

    const getCategory = (id) => {
        let index = categories.findIndex(item => item.id === id)
        return categories[index];
    }

    const getPlace = (id) => {
        let index = places.findIndex(item => item.id === id)
        return places[index];
    }

    const getProvince = (id) => {
        let index = provinces.findIndex(item => item.id === id)
        return provinces[index];
    }

    const items = events.map((item, index) => {
        let now = Date.now();
        let date = new Date(now);

        let category = getCategory(item.category);
        let palace = getPlace(item.place);
        let province = getProvince(palace.address.province);

        let isArchive = (dateFormat(item.endDate) <= dateFormat(date));

        let address = palace.address.district +"/"+ province.name;
        let price = item.price.isFree ? "Ücretsiz" : item.price.options[0].price + " "+item.price.options[0].unit;
        let slug = palace.slug+"/"+item.slug;

        return <div key = {"item-"+index}

                    className={
                        [
                            style.item,
                            isArchive && style.archive,
                        ].join(' ')
                    }
        >
            <div className={style.header}>
                {
                    item.photos.thumbnail ?
                        <Image
                            src={item.photos.thumbnail}
                            alt=""
                            width={375}
                            height={250}
                            layout="responsive"
                        />
                        :
                        <Image
                            src="/images/events/thumbnail-image.jpg"
                            alt=""
                            width={375}
                            height={250}
                            layout="responsive"
                        />
                }
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
                    <p><a href={palace.slug}>{palace.title}</a> - {address}</p>
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
