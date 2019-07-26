const colorObjectArray = queryObj => {
  const colors = queryObj.colors.split(',');
  delete queryObj.colors;

  const colorsObj = colors.map(el => {
    return { colors: el };
  });

  return colorsObj;
};

const genderObjectArray = queryObj => {
  const genders = queryObj.genders.split(',');
  delete queryObj.genders;

  const gendersObj = genders.map(el => {
    return { genders: el };
  });

  return gendersObj;
};

const categoryObjectArray = queryObj => {
  const categories = queryObj.categories.split(',');
  delete queryObj.categories;

  const categoriesObj = categories.map(el => {
    return { categories: el };
  });

  return categoriesObj;
};

module.exports = class ApiFeatures {
  constructor(query, queryParam) {
    this.query = query;
    this.queryParam = queryParam;
  }

  filter() {
    const queryObj = { ...this.queryParam };
    const excludedFields = ['page', 'fields', 'sort', 'limit'];
    excludedFields.forEach(element => delete queryObj[element]);

    if (queryObj.colors) {
      const colorObj = colorObjectArray(queryObj);
      this.query = this.query.and(colorObj);
    }

    if (queryObj.genders) {
      const genderObj = genderObjectArray(queryObj);
      this.query = this.query.and(genderObj);
    }

    if (queryObj.categories) {
      const categoryObj = categoryObjectArray(queryObj);
      this.query = this.query.and(categoryObj);
    }

    this.query = this.query.find().limit(10);
    return this;
  }

  fields() {
    if (this.queryParam.fields) {
      const fields = this.queryParam.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-createdAt -__v');
    }
    return this;
  }

  sort() {
    if (this.queryParam.sort) {
      const sort = this.queryParam.sort.split(',').join(' ');
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
};
