/* BÀI B — VIẾT CODE: Giỏ hàng của xưởng in
   Hoàn thiện class GioHang và hàm napGioHang.
   Không đổi tên class, tên phương thức, tên hàm; không sửa phần "DỮ LIỆU ĐÃ CHO". */

// ---------- DỮ LIỆU ĐÃ CHO (không sửa) ----------
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

// ---------- PHẦN BẠN VIẾT ----------
class GioHang {
	constructor() {
		// Mỗi dòng của giỏ là một object { id, ten, loai, gia, soLuong }.
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm; trả về true nếu thêm được, false nếu soLuong không hợp lệ.
	them(sanPham, soLuong) {
		if (typeof soLuong !== "number" || !Number.isInteger(soLuong) || soLuong <= 0) {
			return false;
		}
		const dong = this.dsDong.find(d => d.id === sanPham.id);
		if (dong !== undefined) {
			// Đã có dòng cùng id: cộng dồn số lượng.
			dong.soLuong += soLuong;
		} else {
			// Sao chép các giá trị cần thiết, KHÔNG giữ tham chiếu tới object bên ngoài.
			this.dsDong.push({
				id: sanPham.id,
				ten: sanPham.ten,
				loai: sanPham.loai,
				gia: sanPham.gia,
				soLuong: soLuong
			});
		}
		return true;
	}

	// 2. Xoá dòng có id tương ứng; trả về true nếu có xoá, false nếu không tìm thấy.
	xoa(id) {
		const viTri = this.dsDong.findIndex(d => d.id === id);
		if (viTri === -1) {
			return false;
		}
		this.dsDong.splice(viTri, 1);
		return true;
	}

	// 3. Tổng tiền cả giỏ.
	tongTien() {
		return this.dsDong.reduce((tong, dong) => tong + dong.gia * dong.soLuong, 0);
	}

	// 4. Object thống kê: { "<loai>": tổng tiền của loại đó, ... }.
	thongKeTheoLoai() {
		const thongKe = {};
		for (const dong of this.dsDong) {
			thongKe[dong.loai] = (thongKe[dong.loai] || 0) + dong.gia * dong.soLuong;
		}
		return thongKe;
	}

	// 5. Dòng có thành tiền lớn nhất (bản sao, có thêm thanhTien); null nếu giỏ rỗng.
	dongDatNhat() {
		if (this.dsDong.length === 0) {
			return null;
		}
		let dat = this.dsDong[0];
		for (const dong of this.dsDong) {
			// So sánh bằng ">" nên khi bằng nhau vẫn giữ dòng đứng trước.
			if (dong.gia * dong.soLuong > dat.gia * dat.soLuong) {
				dat = dong;
			}
		}
		// Trả về BẢN SAO để bên ngoài không sửa được giỏ.
		return { ...dat, thanhTien: dat.gia * dat.soLuong };
	}

	// 6. Mảng BẢN SAO các dòng, mỗi dòng có thêm thuộc tính thanhTien.
	layDanhSach() {
		return this.dsDong.map(dong => ({
			id: dong.id,
			ten: dong.ten,
			loai: dong.loai,
			gia: dong.gia,
			soLuong: dong.soLuong,
			thanhTien: dong.gia * dong.soLuong
		}));
	}

	// 7. Chuỗi JSON của mảng các dòng.
	xuatJSON() {
		return JSON.stringify(this.dsDong.map(dong => ({
			id: dong.id,
			ten: dong.ten,
			loai: dong.loai,
			gia: dong.gia,
			soLuong: dong.soLuong
		})));
	}
}

// 8. Tạo lại một GioHang từ chuỗi JSON do xuatJSON() sinh ra.
function napGioHang(chuoiJSON) {
	const gio = new GioHang();
	for (const dong of JSON.parse(chuoiJSON)) {
		gio.them(dong, dong.soLuong);
	}
	return gio;
}

// ---------- CHẠY THỬ (không sửa) ----------
const gio = new GioHang();
gio.them(DANH_MUC[0], 100);
gio.them(DANH_MUC[3], 200);
gio.them(DANH_MUC[0], 50);
veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);
