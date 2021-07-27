import { FC, useState } from 'react';
import cn from 'classnames';

import s from './Paginator.module.css';

// viod - функция ничего не возвращает (или возвращает undefined)

type PropsType = {
    totalUsersCount: number, 
    pageSize: number, 
    portionSize: number, 
    currentPage: number, 
    onPageChanged: (pageNumber: number) => void      // функция, которая принимает ничего и возвращает viod
};

const Paginator: FC<PropsType> = ({ totalUsersCount, pageSize, portionSize, currentPage, onPageChanged }) => {
    // таким образом получаем постраничное деление, Math.ceil - округление до большего числа в любом случае
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    let portionCount = Math.ceil(pagesCount / portionSize);
    // useState --- указываем, что принимает number, а то, что setPortionNumber - функция, он понимает сам
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.pagination}>
            { portionNumber > 1 && 
            <button className={s.paginatorButton} onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button> } 
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={ cn({
                        [s.selectedPage] : currentPage === p
                    }, s.pageNumber) }
                            key={p}
                            onClick={(e) => {
                                onPageChanged(p);
                            }}>{p}</span>
                })
            }
            {portionCount > portionNumber && 
                <button className={s.paginatorButton} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>  
            }
        </div>
    );
};

export default Paginator;


// cn - classNames
// cn(передается стиль по умолчанию, {
//      [стиль по условию] : условие
// })
