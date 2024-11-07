import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [reviews, setReviews] = useState([]); // Lưu danh sách đánh giá
  const [reviewId, setReviewId] = useState(null); // Lưu reviewId cần xóa

  // Lấy danh sách các đánh giá từ server khi component được render
  useEffect(() => {
    axios.get('/admin/reviews') // Gọi API để lấy danh sách đánh giá
      .then(response => {
        setReviews(response.data); // Cập nhật danh sách đánh giá
      })
      .catch(error => {
        toast.error('Không thể tải danh sách đánh giá!');
      });
  }, []);

  // Xử lý xóa đánh giá
  const handleDelete = (id) => {
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
          const response = await axios.delete(`/admin/reviews/${id}`);
          if (response.status === 200) {
            toast.success('Đánh giá đã được xóa thành công!');
            // Cập nhật lại danh sách sau khi xóa
            setReviews(reviews.filter(review => review.id !== id));
          }
        } catch (error) {
          toast.error('Không thể xóa đánh giá này!');
        }
      }
    });
  };

  return (
    <div>
      <h1>Danh Sách Đánh Giá</h1>
      
      {/* Hiển thị danh sách đánh giá */}
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p>{review.content}</p>
              <button onClick={() => handleDelete(review.id)}>Xóa Đánh Giá</button>
            </li>
          ))
        ) : (
          <p>Không có đánh giá nào.</p>
        )}
      </ul>

      {/* Thông báo khi thành công hoặc thất bại */}
      <ToastContainer />

      {/* Phần nhập reviewId (nếu cần) */}
      <input 
        type="text" 
        value={reviewId || ''} 
        onChange={(e) => setReviewId(e.target.value)} 
        placeholder="Nhập Review ID" 
      />
    </div>
  );
}

export default App;
