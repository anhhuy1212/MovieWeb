import React, { useState, useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//connect redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapAction';
import HomeCarousel from '../../templates/HomeTemplate/HomeCarousel/HomeCarousel';


export default function Home(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();

    // const renderFilms = () => {
    //     return arrFilm.map((phim, index) => {
    //         return (

    //             <Film key={index} />



    //         )
    //     })
    // }

    useEffect(() => {

        dispatch(layDanhSachPhimAction);//dispatch function từ thunk
        dispatch(layDanhSachHeThongRapAction);
    }, [])

    return (
        <div>

            <HomeCarousel />
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilm={arrFilm} />
                    {/* <div class="flex flex-wrap -m-4" style={{ justifyContent: 'center' }}>
                        {renderFilms()}
                    </div> */}
                </div>
            </section>
            <div className="mx-36">
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>

    )
}
