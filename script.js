
const SHEET_ID = "1YWQ1yD_Dtb-eOjVyA1Bt24ht8-gDVI05Mr-j6wIPqSI";
const SHEET_NAME = "ชีต1";

const SHEET_URL =
    `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`;

async function loadProducts() {
    const productArea = document.getElementById("products");

    try {
        const response = await fetch(SHEET_URL);

        if (!response.ok) {
            throw new Error("ไม่สามารถอ่านข้อมูลได้");
        }

        const products = await response.json();

        productArea.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product["ชื่อสินค้า"]}</h3>
                <p>รหัสสินค้า: ${product.ID}</p>
                <p>${product["รายละเอียด"]}</p>
                <h3>ราคา ${product["ราคา"]} บาท</h3>
                <button onclick="alert('คุณเลือก ${product["ชื่อสินค้า"]}')">
                    สั่งซื้อสินค้า
                </button>
            </div>
        `).join("");

    } catch (error) {
        productArea.innerHTML =
            "<p>โหลดสินค้าไม่สำเร็จ กรุณาตรวจสอบการแชร์ Google Sheets</p>";
        console.error(error);
    }
}

loadProducts();
