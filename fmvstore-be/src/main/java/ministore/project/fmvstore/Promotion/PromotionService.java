package ministore.project.fmvstore.Promotion;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.stereotype.Service;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PromotionService {
    private final PromotionRepository promotionRepository;

    public List<Promotion> getAllPromotion() {
        return promotionRepository.findAll();
    }

    public void  createPromotion(PromotionDTO promotionDTO) {

        Promotion promotion = Promotion.builder()
                .code(promotionDTO.getCode())
                .discountPercentage(promotionDTO.getDiscountPercentage())
                .startDate(promotionDTO.getStartDate())
                .endDate(promotionDTO.getEndDate())
                .build();
        promotionRepository.save(promotion);
    }


    public void deletePromotionId(Long promotionId){
        Promotion promotions = promotionRepository.findById(promotionId)
                .orElseThrow(()-> new AppException(ErrorCode.PROMOTION_NOT_FOUND));
        promotionRepository.delete(promotions);
    }


//    private String generateRandomCode(int length) {
//        SecureRandom random = new SecureRandom();
//        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//        StringBuilder code =  new StringBuilder();
//        for (int i = 0; i < length; i++) {
//            code.append(characters.charAt(random.nextInt(characters.length())));
//        }
//        return code.toString();
//    }




}
