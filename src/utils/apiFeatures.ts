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
}


