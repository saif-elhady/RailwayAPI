export class APIFeatures{
    query: any;
    queryString: any;
    constructor(query:any, queryString:any) {
        this.query = query;
        this.queryString = queryString;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
    filter() {
        const queryObject = { ...this.queryString };
        const excludedWords = ['sort', 'page', 'limit','date_from','date_till'];

        excludedWords.forEach(el => delete queryObject[el]);

        this.query = this.query.find(queryObject);

        return this;
    }
    filterByDate() {
        if (this.queryString.date_from || this.queryString.date_till) {
            const dateFilter:any = {};
            if (this.queryString.date_from) {
                const [day, month, year] = this.queryString.date_from.split('/');
                dateFilter.$gte = `${year}-${month}-${day}`;
            }
            if (this.queryString.date_till) {
                const [day, month, year] = this.queryString.date_till.split('/');
                dateFilter.$lte = `${year}-${month}-${day}`;
            }
            this.query = this.query.find({ startingDate: dateFilter });
        }
        return this;
    }
}


