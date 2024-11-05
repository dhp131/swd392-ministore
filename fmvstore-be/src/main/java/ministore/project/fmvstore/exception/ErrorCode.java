package ministore.project.fmvstore.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    CANNOT_SEND_EMAIL(1009, "Cant send email", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND(1010, "Order not found", HttpStatus.NOT_FOUND),
    RESOURCE_NOT_FOUND(10012, "Resource not found", HttpStatus.NOT_FOUND),
    INSUFFICIENT_FUNDS(10013, "Insufficient funds", HttpStatus.BAD_REQUEST),
    ALREADY_PURCHASED(10014, "Already purchased", HttpStatus.BAD_REQUEST),
    PAYMENT_ERROR(10015, "PAYMENT_ERROR", HttpStatus.BAD_REQUEST),
    COURSE_NOT_FOUND(10016, "Course Not Found", HttpStatus.NOT_FOUND),
    PROMOTION_NOT_FOUND(10017,"Promotion not found", HttpStatus.NOT_FOUND),
    INSUFFICIENT_BALANCE(10018, "Insufficient balance", HttpStatus.BAD_REQUEST),
    PROMOTION_EXPIRED(10019, "Promotion expired", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(10020, "Role not existed", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND(10021, "Product not found", HttpStatus.NOT_FOUND),
    EMPTY_ORDER(10022, "Empty order", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}