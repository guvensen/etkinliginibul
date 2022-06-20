import React, {useState} from "react";
import style from './Filter.module.scss';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Filter() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return <div className={style.filterWrapper}>

        <div className={style.searchBar}>
            <input type="text" placeholder="Ara.."/>
        </div>

        <div className={style.filterOptions}>
            <div className={style.formGroup}>
                <label htmlFor="category">Etkinlik Türü</label>
                <select id="category">
                    <option>Tiyatro</option>
                    <option>Müze</option>
                    <option>Konser</option>
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="dates">Tarih</label>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                />
            </div>
        </div>

        <div className={style.filterOptions}>
            <div className={style.formGroup}>
                <label htmlFor="location">Mekan</label>
                <select id="location">
                    <option>Zorlu Center</option>
                    <option>Vadistanbul</option>
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="location">Şehir</label>
                <select id="location">
                    <option>İstanbul</option>
                    <option>Ankara</option>
                </select>
            </div>
        </div>

        <div className={style.filterBtn}>
            Filtrele
        </div>
    </div>
}
