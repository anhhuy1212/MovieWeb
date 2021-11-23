
import React from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styleSlick from './MultipleRowSlick.module.css';
import Film from '../Film/Film'
import { useDispatch, useSelector } from "react-redux";
import Film_Flip from "../Film/Film_Flip";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/types/QuanLyPhimType'





function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>

    );
}



function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}

            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}



const MultipleRowSlick = (props) => {

    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)

    const renderFilms = () => {
        return props.arrFilm.slice(0, 12).map((item, index) => {
            return <div key={index} >
                <Film_Flip item={item} />
            </div>

        })
    }



    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film'
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film'

    console.log('activeClassDC', activeClassDC)


    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div>
            <button className={`${styleSlick[activeClassDC]}px-8 py-3 m-2 w-40 font-semibold rounded-full bg-gray-800 text-white`} onClick={() => {
                const action = { type: SET_FILM_DANG_CHIEU }
                dispatch(action);
            }}> PHIM ĐANG CHIẾU</button>
            <button className={`${styleSlick[activeClassSC]}px-8 py-3 m-2 w-40 font-semibold rounded-full bg-white text-gray-800 border-gray-800 border`} onClick={() => {
                const action = { type: SET_FILM_SAP_CHIEU }
                dispatch(action);
            }}>PHIM SẮP CHIẾU</button>
            <Slider {...settings}>
                {renderFilms()}

            </Slider>
        </div>
    );
}

export default MultipleRowSlick;