import {useState, useEffect} from "react";
import DefaultLayout from '../../components/layouts/default';
import {events, categories, places, provinces} from "../../dummyData";
import style from './style.module.scss';
import EventList from "../../components/EventList/EventList";

export default function Place({slug}) {
    const [data, setData] = useState([]);
    const placeIndex = places.findIndex(i => i.slug === slug);
    const placeId = places[placeIndex].id;

    useEffect(()=>{
        const filteredArray = events.filter(item => {
            let result = true;
            if(item.place !== placeId){
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
                    <h1>{places[placeIndex].title}</h1>
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
