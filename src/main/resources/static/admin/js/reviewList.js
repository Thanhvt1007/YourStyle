// Đảm bảo rằng DOM đã được tải hoàn toàn trước khi gắn sự kiện
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các liên kết xóa
    const deleteLinks = document.querySelectorAll('.delete-review');

    // Duyệt qua tất cả các liên kết xóa và thêm sự kiện click
    deleteLinks.forEach(link => {
        link.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-id'); // Lấy reviewId từ data-id

            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa đánh giá này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: '/admin/reviews/' + reviewId,  // URL đúng cho xóa đánh giá
                        type: 'DELETE',
                        success: function(response) {
                            Swal.fire('Đã xóa!', 'Đánh giá đã được xóa thành công.', 'success').then(() => {
                                location.reload();
                            });
                        },
                        error: function(xhr, status, error) {
                            Swal.fire('Lỗi', 'Không thể xóa đánh giá này.', 'error');
                        }
                    });
                }
            });
        });
    });
});

// Hàm xác nhận xóa nhiều đánh giá
function confirmDeleteMultiple() {
    const selectedReviews = Array.from(document.querySelectorAll('.review-checkbox:checked'))
        .map(checkbox => checkbox.value);
    if (selectedReviews.length > 0) {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa các đánh giá đã chọn?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/admin/reviews/delete-multiple', 
                    type: 'DELETE',
                    data: { reviewIds: selectedReviews }, // Gửi dữ liệu reviewIds
                    success: function(response) {
                        Swal.fire('Đã xóa!', 'Các đánh giá đã được xóa thành công.', 'success').then(() => {
                            location.reload();
                        });
                    },
                    error: function(xhr) {
                        Swal.fire('Lỗi', 'Không thể xóa các đánh giá này.', 'error');
                    }
                });
            }
        });
    } else {
        Swal.fire('Chưa chọn', 'Vui lòng chọn ít nhất một đánh giá.', 'warning');
    }
}

// Hàm để chọn tất cả các đánh giá
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.review-checkbox');
    checkboxes.forEach(item => {
        item.checked = checkbox.checked;
    });
    document.getElementById('deleteReviews').disabled = !checkbox.checked;
}

// Show reply input section
function showReplyInput(reviewId) {
    document.getElementById('replyReviewId').textContent = reviewId;
    document.getElementById('replySection').style.display = 'block';
}

// Submit reply
function submitReply() {
    const replyContent = document.getElementById('replyContent').value;
    const reviewId = document.getElementById('replyReviewId').textContent;
    if (replyContent.trim()) {
        $.ajax({
            url: '/admin/reviews/reply', 
            type: 'POST',
            data: { reviewId: reviewId, replyContent: replyContent },
            success: function(response) {
                Swal.fire('Thành công!', 'Phản hồi đã được gửi.', 'success');
                document.getElementById('replySection').style.display = 'none';
            },
            error: function(xhr) {
                Swal.fire('Lỗi', 'Không thể gửi phản hồi.', 'error');
            }
        });
    } else {
        Swal.fire('Lỗi', 'Vui lòng nhập phản hồi.', 'error');
    }
}
