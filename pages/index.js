import {useState} from "react";
import DefaultLayout from '../components/layouts/default';
import Filter from '../components/Filter/Filter';
import EventList from '../components/EventList/EventList';
import {events, categories, places, provinces} from "../dummyData";

export default function Home() {
    const [data, setData] = useState(events);

    const setFilter = ( categoryId, placeId, provinceId, query, startDate, endDate ) => {
        console.log(categoryId, placeId, provinceId, query, startDate, endDate);
    }

    return (
      <DefaultLayout>
          <div className="container">
              <Filter places={places} categories={categories} provinces={provinces} onFilter={setFilter}/>

              <EventList events={data} categories={categories} places={places}/>
          </div>
      </DefaultLayout>
  )
}
