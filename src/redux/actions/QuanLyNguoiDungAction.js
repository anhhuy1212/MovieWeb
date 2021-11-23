import { Result } from "antd"
import { data } from "autoprefixer"
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"
import { history } from '../../App'



export const dangNhapAction = (thongTinDangNhap) => {


    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
            console.log('result', result);
            if (result.data.statusCode === 200) {
                dispatch({

                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập  về trang trước đó
                history.goBack();
            }


        } catch (error) {
            console.log('error', error);
        }
    }
}


export const layThongTinNguoiDungAction = () => {


    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();

            if (result.data.statusCode === 200) {
                dispatch({

                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
                history.push('/home');
            }

            console.log('result', result);
        } catch (error) {
            console.log('error', error);
        }

    }

}