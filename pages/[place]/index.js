import {useState, useEffect} from "react";
import DefaultLayout from '../../components/layouts/default';
import {events, categories, places, provinces} from "../../dummyData";
import style from './style.module.scss';
import EventList from "../../components/EventList/EventList";

export default function Place({slug}) {
    const [data, setData] = useState([]);
    const getPlaceIdBySlug = places.findIndex(i => i.slug === slug);
    const palceId = places[getPlaceIdBySlug].id;

    useEffect(()=>{
        const filteredArray = events.filter(item => {
            let result = true;
            if(item.place !== palceId){
                result = false;
            }
            return result;
        });

        setData(filteredArray);
    },[])

    return (
        <DefaultLayout>
            <div className="container">
                <div className={style.pageTitle}>
                    <h1>{places[getPlaceIdBySlug].title}</h1>
                </div>

                <EventList events={data} categories={categories} places={places} provinces={provinces}/>
            </div>
        </DefaultLayout>
    )
}

export async function getServerSideProps (context) {
    const slug = context.params.place;

    return {
        props: {slug}
    }
}
