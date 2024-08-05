"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
class APIFeatures {
    query;
    queryString;
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    paginate() {
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 10;
        const skip = (page - 1) * limit;
        return this.query = this.query.skip(skip).limit(limit);
    }
}
exports.APIFeatures = APIFeatures;
