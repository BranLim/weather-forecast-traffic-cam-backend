import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

interface SGRegionRow {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export class SequelizeSGRegion extends Model<
  SGRegionRow,
  Omit<SGRegionRow, 'id'>
> {
  declare id: number;
  declare name: string;
  declare latitude: number;
  declare longitude: number;
}

SequelizeSGRegion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false, tableName: 'SGRegion' },
);
