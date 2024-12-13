import request from "supertest";
import { MainServer } from "../server";

const app = new MainServer().app;

describe("AuthController", () => {
    it("should register a new user", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "benup211@gmail.com",
            password: "Qwerty@12",
            confirmPassword: "Qwerty@12",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty(
            "message",
            "User created successfully! Check Your email for Verification"
        );
        expect(res.body.data).toHaveProperty("email", "benup211@gmail.com");
    });

    it("should error when user already exists", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "benup211@gmail.com",
            password: "Qwerty@12",
            confirmPassword: "Qwerty@12",
        });
        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("errorMessage", "User already exists");
    });

    it("should show error when user is not verified when login", async () => {
        const res = await request(app).post("/api/auth/login").send({
            email: "benup211@gmail.com",
            password: "Qwerty@12",
        });
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty(
            "errorMessage",
            "User is not verified! Check Your email"
        );
    });
});

describe("OTPController", () => {
    it("should verify OTP", async () => {
        const res = await request(app).post("/api/otp/verify-otp").send({
            otp_id: 1,
            user_id: 1,
            otp_code: 123456,
        });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty(
            "errorMessage",
            "Invalid OTP or OTP Already Used"
        );
    });

    it("should resend OTP to a user", async () => {
        const res = await request(app).get("/api/otp/resend-otp/15");

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty(
            "message",
            "OTP sent successfully! Check Your email for Verification"
        );
    });
});
