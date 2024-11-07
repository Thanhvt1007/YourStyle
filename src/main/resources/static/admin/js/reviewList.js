document.addEventListener('DOMContentLoaded', function() {
    const deleteLinks = document.querySelectorAll('.delete-review');

    deleteLinks.forEach(link => {
        link.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-id');
            
            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa đánh giá này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(`/admin/reviews/${reviewId}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            Swal.fire('Đã xóa!', 'Đánh giá đã được xóa thành công.', 'success').then(() => {
                                location.reload();
                            });
                        } else {
                            Swal.fire('Lỗi', 'Không thể xóa đánh giá này.', 'error');
                        }
                    } catch (error) {
                        Swal.fire('Lỗi', 'Không thể xóa đánh giá này.', 'error');
                    }
                }
            });
        });
    });
});

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch('/admin/reviews/delete-multiple', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ reviewIds: selectedReviews }), 
                    });

                    if (response.ok) {
                        Swal.fire('Đã xóa!', 'Các đánh giá đã được xóa thành công.', 'success').then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire('Lỗi', 'Không thể xóa các đánh giá này.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Lỗi', 'Không thể xóa các đánh giá này.', 'error');
                }
            }
        });
    } else {
        Swal.fire('Chưa chọn', 'Vui lòng chọn ít nhất một đánh giá.', 'warning');
    }
}

function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.review-checkbox');
    checkboxes.forEach(item => {
        item.checked = checkbox.checked;
    });
    document.getElementById('deleteReviews').disabled = !checkbox.checked;
}

function showReplyInput(reviewId) {
    document.getElementById('replyReviewId').textContent = reviewId;
    document.getElementById('replySection').style.display = 'block';
}

function submitReply() {
    const replyContent = document.getElementById('replyContent').value;
    const reviewId = document.getElementById('replyReviewId').textContent;

    if (replyContent.trim()) {
        fetch('/admin/reviews/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reviewId: reviewId, replyContent: replyContent }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire('Thành công!', 'Phản hồi đã được gửi.', 'success');
                document.getElementById('replySection').style.display = 'none';
            } else {
                Swal.fire('Lỗi', 'Không thể gửi phản hồi.', 'error');
            }
        })
        .catch(error => {
            Swal.fire('Lỗi', 'Không thể gửi phản hồi.', 'error');
        });
    } else {
        Swal.fire('Lỗi', 'Vui lòng nhập phản hồi.', 'error');
    }
}
