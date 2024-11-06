package yourstyle.com.shope.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import yourstyle.com.shope.model.Review;
import yourstyle.com.shope.service.ReviewService;

import java.util.List;

@Controller
@RequestMapping("/admin/reviews")
public class ReviewAdminController {

	@Autowired
	private ReviewService reviewService;

	// Hiển thị danh sách đánh giá
	@GetMapping
	public String showReviewList(Model model) {
		List<Review> reviews = reviewService.getAllReviews();

		model.addAttribute("reviews", reviews);
		return "admin/reviews/list";
	}

	// Xóa một đánh giá
	@DeleteMapping("/{reviewId}")
	public ResponseEntity<String> deleteReview(@PathVariable Integer reviewId) {
		System.out.println(reviewId);
		boolean isDeleted = reviewService.deleteReview(reviewId);
		if (isDeleted) {
			return ResponseEntity.ok("Review deleted successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found.");
		}
	}

	// Trả lời đánh giá
	@PostMapping("/{id}/reply")
	public ResponseEntity<String> replyToReview(@PathVariable Integer id, @RequestBody String reply) {
		boolean success = reviewService.replyToReview(id, reply);
		if (success) {
			return ResponseEntity.ok("Reply added successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found to reply to.");
		}
	}

}
