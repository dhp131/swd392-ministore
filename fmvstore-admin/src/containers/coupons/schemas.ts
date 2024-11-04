import { DiscountTypeEnum } from "@/client";
import { z } from "zod";

export const promotionFormSchema = z
  .object({
    name: z.string().min(1, 'Please enter campaign name'),
    code: z.string().min(1, 'Please enter coupon code'),
    description: z.string().min(1, 'Please enter description'),
    discount: z.string().min(1, 'Please enter discount'),
    discountType: z.enum([DiscountTypeEnum.AMOUNT, DiscountTypeEnum.PERCENTAGE]),
    startDate: z.string(),
    endDate: z.string(),
  })