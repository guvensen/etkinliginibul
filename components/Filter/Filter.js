import style from './Filter.module.scss';


export default function Filter() {

    return <div className={style.filterWrapper}>
        <div className="">
            <div className={style.formGroup}>
                <label htmlFor="category">Kategori</label>
                <select id="category">
                    <option>Tiyatro</option>
                    <option>Müze</option>
                    <option>Konser</option>
                </select>
            </div>
        </div>
        <div className="">
            <div className={style.formGroup}>
                <label htmlFor="dates">Tarih</label>
                <div className={style.datesWrapper}>
                    <input type="text" id="dates" name="filter-dates"/>
                </div>
            </div>
        </div>
        <div className="">
            <div className={style.formGroup}>
                <label htmlFor="location">Mekan</label>
                <select id="location">
                    <option>İstanbul (Anadolu)</option>
                    <option>İstanbul (Avrupa)</option>
                </select>
            </div>
        </div>
        <div className="">
            <div className={style.filterBtn}>
                Filtrele
            </div>
        </div>
    </div>
}
