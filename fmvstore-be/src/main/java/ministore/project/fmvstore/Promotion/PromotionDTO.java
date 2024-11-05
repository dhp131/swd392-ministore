package ministore.project.fmvstore.Promotion;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDTO {
    private String code;
    private double discountPercentage;
    private Date startDate;
    private Date endDate;
}
