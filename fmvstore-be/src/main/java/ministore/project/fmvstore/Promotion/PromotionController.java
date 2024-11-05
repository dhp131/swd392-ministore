package ministore.project.fmvstore.Promotion;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Response.ApiResponse;
import ministore.project.fmvstore.exception.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PromotionController {
    private PromotionService promotionService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    public ResponseEntity<ApiResponse<String>> createPromotion(@RequestBody PromotionDTO promotionDTO){
        promotionService.createPromotion(promotionDTO);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Promotion Created Successfully")
                .build());
    }

    @GetMapping("/get_all_promotion")
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> getAllPromotion(){
        List<Promotion> promotion =promotionService.getAllPromotion();
        return ResponseEntity.ok(promotion);
    }

    @DeleteMapping("/delete/{promotionId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> deletePromotionById(@PathVariable Long promotionId) {
        try{
            promotionService.deletePromotionId(promotionId);
            return ResponseEntity.ok("Delete successfully");
        }catch (AppException e){
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
