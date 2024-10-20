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
    if (this.queryStr.search === undefined) return this;
    this.queryStr.search = this.queryStr.search.trim();

    let search;

    // check if search is price or not
    if (this.queryStr.search) {
      if (
        this.queryStr.search
          .split("")
          .every((char) => /[0-9.]/.test(char) || char === " ")
      ) {
        search = {
          $and: [
            {
              price: {
                $gte: Number(this.queryStr.search),
              },
            },
            {
              price: {
                $lte: Number(this.queryStr.search) + 1,
              },
            },
          ],
        };
      } else {
        search = {
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
        };
      }
    } else {
      search = {};
    }

    this.query.find({ ...search });
    return this;
  }

  // method to paginate
  paginate() {
    let perPageCount = 10;
    let skipCount = (this.queryStr.page - 1) * 10;
    this.query.find().skip(skipCount).limit(perPageCount);
    return this;
  }
}

// export class
module.exports = APIFeatures;
