package ministore.project.fmvstore.Payment;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PaymentController {
    PaymentService paymentService;

    @PostMapping("/create")
    public ApiResponse<String> createPayment(@RequestBody PaymentRequest request) {
        String paymentUrl = paymentService.createPayment(request);
        return ApiResponse.<String>builder()
                .result(paymentUrl)
                .build();
    }



    @GetMapping("/verify")
    public ApiResponse<String> verifyPayment(@RequestParam Map<String, String> params) {
        try {
            boolean isSuccess = paymentService.verifyPayment(params);
            if (isSuccess) {
                return ApiResponse.<String>builder()
                        .result("Payment success!")
                        .build();
            } else {
                return ApiResponse.<String>builder()
                        .result("Payment verification failed!")
                        .build();
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return ApiResponse.<String>builder()
                    .result("Error occurred during payment verification!")
                    .build();
        }
    }
}
