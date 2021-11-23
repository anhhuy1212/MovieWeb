import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";
import { ThongTinDatVe } from '../_core/models/ThongTinDatVe'

export class QuanLyDatVeService extends baseService {
    constructor() {
        super();
    }

    layChiTietPhongVe = (maLichChieu) => { //ma lich chieu lay tu url
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.post(`http://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }


}
export const quanLyDatVeService = new QuanLyDatVeService();
