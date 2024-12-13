export const VERIFICATION_CODE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #f44336, #d32f2f); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Your Verification Code</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Hi there!</p>
        <p>To complete your registration, please use the following Verification code:</p>
        <h2 style="text-align: center; font-size: 24px; font-weight: bold; color: #f44336;">{Verification_code}</h2>
        <p>This code is valid for the next 10 minutes. If you did not request this code, please disregard this email.</p>
        <p>You can also verify your email by clicking the link below:</p>
        <p style="text-align: center;">
            <a href="{Verification_link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #f44336; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </p>
        <p>If you have any questions or require assistance, feel free to reach out to our support team. We're here to help!</p>
        <p>Thank you for using our app!</p>
        <p>Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
</body>
</html>
`;