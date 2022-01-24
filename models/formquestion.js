'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const GoogleForm=models.GoogleForm
      GoogleForm.hasMany(FormQuestion)
      FormQuestion.belongsTo(GoogleForm)
    }
  };
  FormQuestion.init({
    googleFormId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    qType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FormQuestion',
  });
  return FormQuestion;
};