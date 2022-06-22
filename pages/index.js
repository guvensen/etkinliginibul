import {useState, useEffect} from "react";
import DefaultLayout from '../components/layouts/default';
import Filter from '../components/Filter/Filter';
import EventList from '../components/EventList/EventList';
import {events, categories, places, provinces} from "../dummyData";
import style from './style.module.scss';
import {dateFormat} from "../components/dateFormat/dateFormat";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from "swiper";
import Image from "next/image";


export default function Home() {
    const [data, setData] = useState([]);
    const [archiveToggle, setArchiveToggle] = useState(false);
    const [sliderPopularImages, setSliderPopularImages] = useState([]);

    const setFilter = ( param ) => {
        let currentData;

        if(param.startDate === null){
            currentData = getUpcomingEvents();
        }else{
            currentData = events;
        }

        const filteredArray = currentData.filter(item => {
            let result = true;
            for(let key in param) {

                if(param[key] !== null && parseInt(param[key]) !== 0){

                    if(key === "province"){
                        let placeIndex = places.findIndex(i => i.id === item.place);

                        if(places[placeIndex].address.province !== parseInt(param[key])){
                            result = false;
                            break;
                        }
                    }else if(key === "query"){
                        let searchKey = new RegExp(param[key],'i');

                        if(item.title.search(searchKey) === -1 && item.performer.search(searchKey) === -1){
                            result = false;
                            break;
                        }

                    }else if(key === "startDate" || key === "endDate" ){
                        if(!param.endDate){
                            if(!((dateFormat(param.startDate) >= dateFormat(item.startDate)) && (dateFormat(param.startDate) <= dateFormat(item.endDate)))){
                                result = false;
                                break;
                            }
                        }else{
                            if(!((dateFormat(item.startDate) >= dateFormat(param.startDate)) && (dateFormat(item.startDate) <= dateFormat(param.endDate)))){
                                result = false;
                                break;
                            }
                        }
                    }else{
                        if (item[key] !== parseInt(param[key])){
                            result = false;
                            break;
                        }
                    }
                }
            }
            return result;
        })

        setData(filteredArray);
    }

    const getUpcomingEvents = () => {
        let now = Date.now();
        let date = new Date(now);

        return events.filter(item => {
            let result = true;

            if((dateFormat(item.endDate) <= dateFormat(date)) ){
                result = false;
            }

            return result;
        });
    }

    const onUpcomingEventsButton = () => {
        let upcomingData = getUpcomingEvents();

        setArchiveToggle(false);
        setData(upcomingData);
    }

    const onArchiveEventsButton = () =>{
        let now = Date.now();
        let date = new Date(now);

        const filteredArchive = events.filter(item => {
            let result = true;

            if((dateFormat(item.endDate) >= dateFormat(date))){
                result = false;
            }

            return result;
        });

        setArchiveToggle(true);
        setData(filteredArchive);
    }

    const sliderOfThePopular = () =>{
        let upcomingData = getUpcomingEvents();

        let images = [];

        upcomingData.filter((item)=>{
            let result = true;
            if(item.isPopular){
                let image = "/images/events/slider-image.jpg"
                if(item.photos.slider){
                    image = item.photos.slider;
                }
                images.push(image);
            }
            return result;
        });

        setSliderPopularImages(images);
    }

    const sliderImages = sliderPopularImages.map((item, index)=>{
           return <SwiperSlide key={"index-"+index}>
                <Image
                    src={item}
                    width={1200}
                    height={350}
                />
            </SwiperSlide>
        })

    useEffect(() => {
        let now = Date.now();
        let date = new Date(now);

        const filteredArchive = events.filter(item => {
            let result = true;

            if((dateFormat(item.endDate) <= dateFormat(date)) ){
                result = false;
            }

            return result;
        });

        sliderOfThePopular();
        setData(filteredArchive);
    },[]);


    return (
      <DefaultLayout>
          <div className="container">
              <Swiper
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
              >
                  {sliderImages}
              </Swiper>
          </div>

          <Filter places={places} categories={categories} provinces={provinces} onFilter={setFilter}/>

          <div className="container">
              <div className={style.sectionHeader}>
                  <h1 className={style.title}>Etkinlikler</h1>

                  <div className={style.buttonWrapper}>
                      <div className={
                               [
                                   style.eventsButton,
                                   !archiveToggle && style.active,
                               ].join(' ')
                      }
                           onClick={onUpcomingEventsButton}>Gelecek Etkinlikler</div>
                      <div className={
                          [
                              style.eventsButton,
                              archiveToggle && style.active,
                          ].join(' ')
                      } onClick={onArchiveEventsButton}>Arşiv</div>
                  </div>

              </div>

              {
                  (data.length > 0) ?
                      <EventList events={data} categories={categories} places={places} provinces={provinces}/>
                      :
                      <p>Aradığınız Kriterlere Uygun Etkinlik Bulunamamıştır.</p>
              }

          </div>
      </DefaultLayout>
  )
}
