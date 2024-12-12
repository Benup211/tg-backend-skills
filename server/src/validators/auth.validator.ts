import { body } from "express-validator";

export class AuthValidator {
    static registerUser() {
        return [
            body("email")
                .notEmpty()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Invalid Email Address"),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                )
                .withMessage(
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm Password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage(
                    "Confirm Password must be the same as the Password"
                ),
        ];
    }
    static loginUser() {
        return [
            body("email").isEmail().withMessage("Invalid email"),
            body("password").notEmpty().withMessage("Password is required"),
        ];
    }
}
