import React, { useState } from 'react';
import style from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return <header className={style.header}>
        <div className="container">

            <div className={style.wrapper}>
                <a href="/" className={style.logoWrapper}>
                    <span className={style.iconWrapper}>
                        <FontAwesomeIcon icon={faCalendarAlt} className={style.icon}/>
                    </span>
                    <span className={style.textWrapper}>
                        <h1>Etkinliğini Bul</h1>
                    </span>
                </a>

                <div className={style.menuWrapper}>
                    <nav className={(isOpen) ? style.show : "" }>
                        <a href="/" className={style.item}><p>#Popüler Etkinlikler</p></a>

                        <a href="/mekanlar" className={style.item}><p>Mekanlar</p></a>

                        <a href="/iletisim" className={style.item}><p>İletişim</p></a>
                    </nav>
                </div>

                <div className={style.mobileMenuButton} onClick={() => setIsOpen(!isOpen)}>

                    {isOpen?
                        <FontAwesomeIcon icon={faTimes}/>
                        :
                        <FontAwesomeIcon icon={faBars}/>
                    }
                </div>
            </div>
        </div>
    </header>
}
