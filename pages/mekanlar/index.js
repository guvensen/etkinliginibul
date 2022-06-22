import DefaultLayout from '../../components/layouts/default';
import style from "./style.module.scss";
import {places} from "../../dummyData";

export default function Mekanlar() {

    const placesData = places.map((item,index)=>{
        return <div key={"index-"+index} className={style.item} ><a href={item.slug}>{item.title}</a></div>
    });

    return <DefaultLayout>
        <div className={style.placeWrapper}>
            <div className="container">
                <div className={style.title}>
                    <h1 >Mekanlar</h1>
                </div>

                {placesData}
            </div>
        </div>
    </DefaultLayout>
}
