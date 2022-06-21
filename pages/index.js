import {useState} from "react";
import DefaultLayout from '../components/layouts/default';
import Filter from '../components/Filter/Filter';
import EventList from '../components/EventList/EventList';
import {events, categories, places, provinces} from "../dummyData";

export default function Home() {
    const [data, setData] = useState(events);

    const dateFormat = (date) =>{
        let d = date;

        if(typeof date === "string"){
             d = new Date(date.replace(/-/g, "/"));
        }

        const year          = d.getFullYear();
        const month         = ("0"+(d.getMonth() + 1)).slice(-2);
        const day           = ("0"+d.getDate()).slice(-2);
        const hour          = ("0"+d.getHours()).slice(-2);
        const minutes       = ("0"+d.getMinutes()).slice(-2);

        return year+"-"+month+"-"+day;
    }

    const setFilter = ( param ) => {

        const filteredArray = events.filter(item => {
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
                            if(!((dateFormat(item.startDate) <= dateFormat(param.startDate)) && (dateFormat(param.startDate) <= dateFormat(item.endDate)))){
                                result = false;
                                break;
                            }
                        }else{
                            if(((dateFormat(param.startDate) <= dateFormat(item.startDate)) && (dateFormat(param.endDate) <= dateFormat(item.endDate)))){
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

    return (
      <DefaultLayout>
          <div className="container">
              <Filter places={places} categories={categories} provinces={provinces} onFilter={setFilter}/>

              <EventList events={data} categories={categories} places={places}/>
          </div>
      </DefaultLayout>
  )
}
