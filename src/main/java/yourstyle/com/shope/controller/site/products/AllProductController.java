package yourstyle.com.shope.controller.site.products;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AllProductController {
    @RequestMapping({ "/", "/allproduct" })
    public String showAdminPage() {
        return "site/products/allproduct";
    }
}