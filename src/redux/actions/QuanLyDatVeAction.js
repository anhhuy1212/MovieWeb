import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }

        } catch (error) {
            console.log('error', error)
            console.log('error', error.reponse?.data)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe) => {
    return async dispatch => {

        try {

            dispatch(displayLoadingAction)

            const result = await quanLyDatVeService.datVeAction(thongTinDatVe)
            console.log(result.data.content)
            dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))

            dispatch(hideLoadingAction)

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error.reponse?.data)
        }
    }
}