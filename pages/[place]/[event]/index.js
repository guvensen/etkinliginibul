import DefaultLayout from '../../../components/layouts/default';
import style from './style.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faTicketAlt} from '@fortawesome/free-solid-svg-icons';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {events, categories, places, provinces} from "../../../dummyData";
import Image from "next/image";


export default function Event({event, place, category, province}) {

    const sliderImages = event.photos.details.map((item,index)=>{
        return <SwiperSlide key={"index-"+index}>
            <Image
                src={item}
                width={720}
                height={300}
            />
        </SwiperSlide>
    })

    return <DefaultLayout>
        <div className={style.eventDetailWrapper}>

            <div className={style.titleWrapper}>
                <h1>{event.title}</h1>
            </div>

            <div className={style.separator}>
                <div className="container">
                    <a href="/"><FontAwesomeIcon icon={faArrowCircleLeft} className={style.icon}/> Ana Sayfa</a>
                </div>
            </div>

            <div className="container">

                <div className={style.eventInfoWrapper}>

                    <div className={style.columnFirst}>
                        <div className={style.sliderContainer}>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                            >
                                {
                                    (event.photos.details.length > 0) ?
                                        sliderImages
                                        :
                                        <Image
                                            src="/images/events/detail-default-image.jpg"
                                            width={720}
                                            height={300}
                                        />
                                }
                            </Swiper>
                        </div>

                        <div className={style.sideBar}>

                            <h2 className={style.title}>Tarih ve Zaman</h2>

                            <p><span>Başlangıç Tarihi:</span> {event.startDate}</p>

                            <p><span>Bitiş Tarihi:</span> {event.endDate}</p>

                            <h2 className={style.title}>Etkinlik Türü</h2>
                            <p className={style.eventCategory}>{category.title}</p>
                        </div>
                    </div>

                    <div className={style.columnSecond}>

                        <p className={style.description}>{event.description}</p>

                        <h2 className={style.title}>Bilet Bilgileri</h2>

                        { event.price.isFree ?
                            <p className={style.freePriceText}><FontAwesomeIcon icon={faTicketAlt} className={style.icon}/> Ücretsiz</p>
                            :
                            <div className={style.priceTable}>
                            {
                                event.price.options.map((item, index) => {

                                    return <p key={"index-" + index} > <FontAwesomeIcon icon={faTicketAlt} className={style.icon}/> {item.description&& item.description+" - "}  {item.price} {item.unit}</p>
                                })
                            }
                            </div>
                        }

                        <div>
                            <p className={style.buyTicketButton}>Bilet Al</p>
                        </div>

                        <h2 className={style.title}>Mekan Bilgileri</h2>

                        <p className={style.place}><a href={"/"+place.slug}>{place.title}</a></p>

                        <p className={style.address}><span>Adres :</span> {place.address.line}, {place.address.postCode} {place.address.district} / {province.name}</p>

                    </div>

                    <div>
                        <iframe
                            src={place.googleMapUrl}
                            width="100%" height="450" allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>

    </DefaultLayout>
}

export async function getServerSideProps(context) {
    const slug = context.params.event;
    const eventIndex = events.findIndex(i => i.slug === slug);
    const event = events[eventIndex];

    const placeIndex = places.findIndex(i => i.id === event.place);
    const place = places[placeIndex];

    const categoryIndex = categories.findIndex(i => i.id === event.category);
    const category = categories[categoryIndex];

    const provinceIndex = provinces.findIndex(i => i.id === place.address.province);
    const province = provinces[provinceIndex];


    return {
        props: {event, place, category, province}
    }
}
