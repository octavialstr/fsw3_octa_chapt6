'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mobil.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    gambar: DataTypes.STRING,
    createdby: DataTypes.STRING,
    deletedby: DataTypes.STRING,
    updatedby: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'mobil',
    paranoid:true,
    deletedAt:"deletedAt"
  });
  return mobil;
};