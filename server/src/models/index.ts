import User from './user';
import OTP from './otp';

User.hasMany(OTP, { foreignKey: 'user_id', as: 'otps' });
OTP.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { User, OTP };
