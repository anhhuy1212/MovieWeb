import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import style from './Checkout.module.css'
import './Checkout.css'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { DAT_VE } from '../../redux/types/QuanLyDatVeType'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import _ from 'lodash'
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import moment from 'moment'

function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        //Goi ham tao ra 1 async function
        const action = layChiTietPhongVeAction(props.match.params.id)
        //Dispatch function nay di
        dispatch(action)
    }, [])

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeat = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat'
            }

            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }


            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDangDat} ${classGheDaDat} ${classGheDaDuocDat} `} >
                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined /> : <CloseOutlined /> : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className=" min-h-screen mt-5">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black" style={{ width: '80%', height: 15 }}>

                        </div>

                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black"> M??n h??nh</h3>
                        </div>
                        <div>
                            {renderSeat()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className="divide-y divide-gray-200 w-2/3" >
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Gh??? ch??a ?????t</th>
                                    <th>Gh??? ??ang ?????t</th>
                                    <th>Gh??? ???? ?????t</th>
                                    <th>Gh??? VIP</th>
                                    <th>Gh??? m??nh ?????t</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td><button className="ghe text-center "> <UserOutlined /></button></td>
                                    <td><button className="ghe gheDangDat text-center"> <UserOutlined /></button></td>
                                    <td><button className="ghe gheDaDat text-center"> <UserOutlined /></button></td>
                                    <td><button className="ghe gheVip text-center"> <UserOutlined /></button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"> <UserOutlined /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-2xl">0 ??</h3>
                    <hr />
                    <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                    <p>?????a ??i???m: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ng??y chi???u : {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className="text-red-400 text-lg">Gh???</span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl"> {gheDD.stt} </span>
                            })}
                        </div>
                        <div className="text-right col-span-1" >
                            <span className="text-right text-green-400 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5">
                        <i>Email</i><br />
                        {userLogin.email}
                    </div>
                    <div className="my-5">
                        <i>Phone</i><br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div className="mb-0  flex flex-col justify-end ">
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;

                            console.log(thongTinDatVe);

                            dispatch(datVeAction(thongTinDatVe));
                            //  
                        }} className="bg-green-500 text-white w-full text-center py-3 text-2xl font-bold cursor-pointer ">
                            ?????T V??
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}




const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

export default function (props) {
    return (
        <div className="p-5">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="01 CH???N GH??? & THANH TO??N" key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab="02 K???T QU??? ?????T V??" key="2">
                    <KetQuaDatVe {...props} />
                </TabPane>

            </Tabs>
        </div>
    )
}

function KetQuaDatVe(props) {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
    }, [])

    console.log('Thongtinnguoidung', thongTinNguoiDung)

    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {

            const seats = _.first(ticket.danhSachGhe)

            return (
                <div className="flex flex-wrap -m-2" key={index}>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                                <p className="text-gray-500">Gi??? chi???u:{moment(ticket.ngayDat).format('hh:mm A')}- Ng??y chi???u:{moment(ticket.ngayDat).format('DD-MM-YYYY')}.</p>
                                <p>?????a ??i???m : {seats.tenHeThongRap} </p>
                                <p>
                                    T??n r???p:{seats.tenCumRap} - Gh??? {ticket.danhSachGhe.map((ghe, index) => {
                                        return <span key={index}>
                                            {ghe.tenGhe}
                                        </span>
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }

    return <div className="p-5">
        <h3>K???t qu??? ?????t v??</h3>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">L???ch s??? ?????t v?? kh??ch h??ng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Xin qu?? kh??ch xem k??? th??ng tin ?????a ??i???m v?? th???i gian ????? tr???i nghi???m phim t???t nh???t.</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>

            </div>
        </section>

    </div>
}
