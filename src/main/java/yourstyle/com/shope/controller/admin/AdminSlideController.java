package yourstyle.com.shope.controller.admin;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import yourstyle.com.shope.model.Slide;
import yourstyle.com.shope.service.SlideService;

@Controller
@RequestMapping("/admin/slide")
public class AdminSlideController {

	@Autowired
	private SlideService slideService;

	// Hiển thị form thêm Slide mới
	@GetMapping("/add")
	public String addSlideForm(Model model) {
		model.addAttribute("slide", new Slide());
		return "admin/slides/addSlide";
	}

	@PostMapping("/add")
	public String addSlide(@ModelAttribute Slide slide, @RequestParam("image") MultipartFile image) {
		try {
			// Lưu ảnh vào thư mục hoặc cơ sở dữ liệu
			String imagePath = saveImage(image);
			slide.setImage(imagePath); // Giả sử bạn lưu đường dẫn ảnh vào cơ sở dữ liệu

			slideService.addSlide(slide); // Gọi service để thêm slide vào DB
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/admin/slide/list";
	}

	// Lưu ảnh vào thư mục
	private String saveImage(MultipartFile image) throws IOException {
		String uploadDir = "path/to/your/upload/folder"; // Đường dẫn lưu ảnh trên server
		String imageName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
		Path path = Paths.get(uploadDir, imageName);

		// Kiểm tra nếu thư mục chưa tồn tại thì tạo nó
		Files.createDirectories(Paths.get(uploadDir));

		Files.copy(image.getInputStream(), path); // Sao chép ảnh vào thư mục
		return imageName; // Trả về tên ảnh lưu lại
	}

	// Xử lý sửa Slide
	@PostMapping("/edit")
	public String editSlide(Slide slide) {
		slideService.editSlide(slide);
		return "redirect:/admin/slide/list";
	}

	// Xử lý xóa Slide
	@PostMapping("/delete")
	public String deleteSlide(int slideId) {
		slideService.deleteSlide(slideId);
		return "redirect:/admin/slide/list";
	}
	@PostMapping("/upload")
	public String uploadImage(@RequestParam("file") MultipartFile file) {
	    String fileName = file.getOriginalFilename();
	    Path path = Paths.get("/path/to/images/" + fileName);
	    try {
	        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "Error uploading image";
	    }
	    return "Image uploaded successfully!";
	}
}
