/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------
const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1 + F2 + F3. Cập nhật bộ đếm, lọc tin theo từ khoá và báo "không tìm thấy".
function capNhat() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacTin = Array.from(dsTin.querySelectorAll("li"));
	let soHien = 0;
	for (const tin of cacTin) {
		const vanBan = (tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent).toLowerCase();
		if (vanBan.includes(tuKhoa)) {
			tin.classList.remove("an");
			soHien++;
		} else {
			tin.classList.add("an");
		}
	}
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	if (soHien === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}
}

// F2. Gõ từ khoá là lọc ngay.
oTimKiem.addEventListener("keyup", capNhat);

// F4. Mở rộng / thu gọn — CHỈ MỘT trình lắng nghe click, đặt trên #list (hoạt động cả với tin mới đăng).
dsTin.addEventListener("click", (e) => {
	if (!e.target.classList.contains("more")) {
		return;
	}
	const doanVan = e.target.parentNode.querySelector("p");
	doanVan.classList.toggle("day-du");
	e.target.textContent = doanVan.classList.contains("day-du") ? "Thu gọn <<" : "Read more >>";
});

// F5. Đăng tin nhanh.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const muc = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const tieuDeMoi = document.createElement("h3");
	tieuDeMoi.textContent = tieuDe;
	const noiDungMoi = document.createElement("p");
	noiDungMoi.textContent = noiDung;
	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";
	muc.append(ngay, tieuDeMoi, noiDungMoi, nutMore);
	dsTin.prepend(muc);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	// Tin mới phải tuân theo bộ lọc đang gõ và bộ đếm phải cập nhật.
	capNhat();
});

// F1. Ngay khi tải trang, bộ đếm đã đúng.
capNhat();
