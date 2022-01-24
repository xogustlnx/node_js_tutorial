'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormQuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const FormQuestion=models.FormQuestion
      FormQuestion.hasMany(FormQuestionOption)
      FormQuestionOption.belongsTo(FormQuestion)
    }
  };
  FormQuestionOption.init({
    formQuestionId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FormQuestionOption',
  });
  return FormQuestionOption;
};