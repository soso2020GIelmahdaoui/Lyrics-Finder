class ApiError extends Error{
    statusCode: any;
    status: string;
    constructor(message:any,statusCode:any) {
        super(message);
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4")? 'fail' : 'error'
    }
}
export default ApiError