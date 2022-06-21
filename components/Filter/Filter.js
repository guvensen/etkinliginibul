import React, {useState} from "react";
import style from './Filter.module.scss';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function Filter({places, categories, provinces, onFilter}) {
    const [currentPlaces, setCurrentPlaces] = useState(places);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [filterData, setFilterData] = useState({
        category: null,
        place: null,
        province: null,
        query: null
    });

    const handleInputChange = (event) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        if(value==="false"){
            value=false;
        }

        const name = target.name;

        let  newState = {...filterData, [name]:value}
        setFilterData(newState);
    }

    const handleSelectChange = (meta) => {
        let result;
        let name = meta.target.name;
        let value = meta.target.value;

        result = {...filterData, [name]:value}

        if(name === "province"){
            placeByProvince(value);

            result = {...filterData, [name]:value, place: 0}
        }

        setFilterData(result);
    }

    const placeByProvince = (provinceId) => {

        let currentPlaces = places;

        if(parseInt(provinceId) !== 0){
            currentPlaces = places.filter(item => {
                let result = true;

                if(item.address.province !== parseInt(provinceId)){
                    result = false;
                }

                return result;
            });
        }

        setCurrentPlaces(currentPlaces);
    }

    const onFilterClick = () => {
        let result = {...filterData, startDate:startDate, endDate:endDate}

        onFilter(result);
    }

    const placeList = currentPlaces.map((item,index)=>{
        return <option key={"key-"+index} value={item.id}>{item.title}</option>
    })

    const categoryList = categories.map((item,index)=>{
        return <option key={"key-"+index} value={item.id}> {item.title}</option>
    })

    const provinceList = provinces.map((item,index)=>{
        return <option key={"key-"+index} value={item.id}> {item.name}</option>
    })

    return <div className={style.filterWrapper}>

        <div className={style.searchBar}>
            <input
                type="text"
                placeholder="Ara.."
                name="query"
                onChange={handleInputChange}
            />
        </div>

        <div className={style.filterOptions}>
            <div className={style.formGroup}>
                <label htmlFor="province">Şehir</label>
                <select id="province"
                        name="province"
                        onChange={(meta) => {
                            handleSelectChange(meta)
                        }}
                >
                    <option value="0">Seçiniz</option>
                    {provinceList}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="place">Mekan</label>
                <select id="place"
                        name="place"
                        onChange={(meta) => {
                            handleSelectChange(meta)
                        }}
                >
                    <option value="0">Seçiniz</option>
                    {placeList}
                </select>
            </div>
        </div>

        <div className={style.filterOptions}>
            <div className={style.formGroup}>
                <label htmlFor="category">Etkinlik Türü</label>
                <select id="category"
                        name="category"
                        onChange={(meta) => {
                            handleSelectChange(meta)
                        }}
                >
                    <option value="0">Seçiniz</option>
                    {categoryList}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="dates">Tarih</label>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Seçiniz"
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                />
            </div>
        </div>

        <div className={style.filterBtn} onClick={onFilterClick}>
            Filtrele
        </div>
    </div>
}
