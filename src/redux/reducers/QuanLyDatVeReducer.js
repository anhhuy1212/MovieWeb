import { values } from "lodash-es"
import { DAT_VE, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType"
import { ThongTinLichChieu } from '../../_core/models/ThongTinPhongVe'


const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: []
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE:
            {
                state.chiTietPhongVe = action.chiTietPhongVe;
                return { ...state }
            }
        case DAT_VE:
            {
                console.log(action)
                //Cap nhat danh sach ghe dang dat
                let danhSachGheCapNhat = [...state.danhSachGheDangDat]

                let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
                if (index != -1) {
                    //Neu tim thay ghe duoc chon trong mang co nghia la ghe da duoc click vao roi => xoa di
                    danhSachGheCapNhat.splice(index, 1);
                } else {
                    danhSachGheCapNhat.push(action.gheDuocChon)
                }
                return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
            }
        default: return { ...state }
    }
}