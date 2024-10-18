// class to search and pagination
class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // method to monthwise
  monthWise() {
    let queryStr = this.queryStr.month
      ? {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, this.queryStr.month],
          },
        }
      : {};
    this.query.find({ ...queryStr });
    return this;
  }

  // method to search in title, description
  search() {
    let search = this.queryStr.search
      ? {
          $or: [
            {
              title: {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: this.queryStr.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    this.query.find({ ...search });
    return this;
  }

  // method to paginate
  paginate(){
    let perPageCount = 10;
    let skipCount = (this.queryStr.page - 1 ) * 10;
    this.query.find().skip(skipCount).limit(perPageCount);
    return this;
  }
}

// export class
module.exports = APIFeatures;
