import React from 'react';
import { NavLink } from 'react-router-dom';
import './Film_Flip.css'

export default function Film_Flip(props) {

    const { item } = props;

    return (
        <div className="containerflip">
            <div className="card">
                <div className="imgBx">
                    <img src={item.hinhAnh} />
                </div>
                <div className="contentBx">
                    <h2>{item.tenPhim}</h2>

                    <NavLink to={`/detail/${item.maPhim}`}>Đặt vé</NavLink>
                </div>
            </div>
        </div>

    )
}
