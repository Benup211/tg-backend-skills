import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeDB } from '../db/config/database';
import User from './user';

interface OTPAttributes {
    id: number;
    user_id: number;
    otp_code: number;
    created_at?: Date;
    expires_at: Date;
    is_used: boolean;
}

interface OTPCreationAttributes extends Optional<OTPAttributes, 'id'> {}

class OTP extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
    public id!: number;
    public user_id!: number;
    public otp_code!: number;
    public readonly created_at!: Date;
    public expires_at!: Date;
    public is_used!: boolean;
}

OTP.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        otp_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize:sequelizeDB,
        tableName: 'otp',
        timestamps: false,
    }
);

export default OTP;
