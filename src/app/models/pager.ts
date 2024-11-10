export class Pager {

    public TotalItems: number | undefined;
    public CurrentPage: number | undefined; //= 1;
    public PageSize: number | undefined;
    public TotalPages: number | undefined;
    public StartPage: number | undefined;
    public EndPage: number | undefined;


    constructor(total: number, page: number = 1, take: number = 8) {

        if (page < 1) {
            page = 1;
        }

        if (take < 1) {
            take = 8;
        }

        let totalPages = Math.ceil(total / take);
        let currentPage = page != null ? page : 1;
        let startPage = currentPage - 5;
        let endPage = currentPage + 4;

        if (startPage <= 0) {
            endPage -= (startPage - 1);
            startPage = 1;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            if (endPage > 10) {
                startPage = endPage - 9;
            }
        }

        this.TotalItems = total;
        this.CurrentPage = currentPage;
        this.PageSize = take;
        this.TotalPages = totalPages;
        this.StartPage = startPage;
        this.EndPage = endPage;
    }
}
