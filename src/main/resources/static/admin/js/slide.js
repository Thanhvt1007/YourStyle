function showFileInput(numImages) {
	// Ẩn khu vực chọn số lượng ảnh
	document.getElementById("chooseImageCountForm").style.display = "none";

	// Hiển thị khu vực chọn ảnh
	document.getElementById("imageSelectionArea").style.display = "block";
	document.getElementById("submitImages").style.display = "block";
	document.getElementById("exitButton").style.display = "block";
	const previewContainer = document.getElementById("imagePreviewArea");
	previewContainer.innerHTML = ""; // Xóa các khung ảnh trước đó

	// Tạo đủ số khung ảnh dựa trên số lượng người dùng đã chọn
	for (let i = 0; i < numImages; i++) {
		const imgContainer = document.createElement("div");
		imgContainer.classList.add("image-placeholder");

		// Tạo nút "Chọn ảnh" cho mỗi khung
		const button = document.createElement("button");
		button.type = "button";
		button.innerText = "Chọn ảnh";
		button.onclick = () => document.getElementById("additionalImages").click();
		imgContainer.appendChild(button);

		previewContainer.appendChild(imgContainer);
	}

	// Đặt thuộc tính 'max-files' để giới hạn số lượng ảnh có thể chọn
	document.getElementById("additionalImages").setAttribute("max-files", numImages);
}

function previewImages(event) {
	const previewContainer = document.getElementById("imagePreviewArea");
	const files = event.target.files;

	// Giới hạn số ảnh hiển thị theo khung đã tạo
	for (let i = 0; i < files.length && i < previewContainer.children.length; i++) {
		const file = files[i];
		const imgContainer = previewContainer.children[i];

		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function(e) {
				imgContainer.innerHTML = ""; // Xóa nút chọn ảnh trong khung

				const imgElement = document.createElement("img");
				imgElement.src = e.target.result;
				imgContainer.appendChild(imgElement);
			};
			reader.readAsDataURL(file);
		}
	}
}

document.getElementById("customFileButton").addEventListener("click", function() {
	document.getElementById("additionalImages").click();
});
// Sự kiện cho nút Thoát
document.getElementById("exitButton").addEventListener("click", function() {
	window.location.href = "/yourstyle/home"; // Đường dẫn về trang chủ
});
function previewImages(event) {
    const previewArea = document.getElementById('additionalImagesPreview');
    previewArea.innerHTML = ''; // Clear any previous images

    const files = event.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('image-preview');
                img.style.width = '150px';
                img.style.height = '200px';
                img.style.objectFit = 'cover';
                previewArea.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    }
}

