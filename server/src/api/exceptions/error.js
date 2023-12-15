export default class Error {
    static code = {
        no_credentials_sent: 10000,
        not_authorized: 10001,
        authentication_failed: 10002,
        invalid_request: 10003,
        invalid_address: 10004,
        invalid_employee_id: 10005,
        invalid_working_address_id: 10006,
        duplicated_identifier: 10007,
        invalid_order_id: 10008,
        invalid_password: 10009,
        invalid_refresh_token: 10010,
        no_refresh_token: 10011,
        invalid_date_param_format: 10012,
        invalid_district_id: 10013,
        invalid_commune_id: 10014,
        invalid_province_id: 10015,
        no_record_found: 10016,
        no_return_in_root_process: 10017,
        repeated_data_update: 10018,
        invalid_data_order: 10019
    };

    static initErrors() {
        this.errors.set(this.code.no_credentials_sent,
            new ErrorRes("No credentials sent!"));

        this.errors.set(this.code.not_authorized,
            new ErrorRes("Not authorized!"));

        this.errors.set(this.code.authentication_failed,
            new ErrorRes("Authentical failed!"));

        this.errors.set(this.code.invalid_request,
            new ErrorRes("Invalid request format!"));

        this.errors.set(this.code.invalid_address,
            new ErrorRes("Invalid Data!",
                "Invalid Address! Check if the commune ID does not match with province ID and district ID in address object."));

        this.errors.set(this.code.invalid_working_address_id,
            new ErrorRes("Invalid Data!",
                "Invalid Working Address ID! Working address ID cannot be found or does not match with role registered."));

        this.errors.set(this.code.duplicated_identifier,
            new ErrorRes("Invalid Data!",
                "Duplicated Identifier! This identifier has been registered before."));

        this.errors.set(this.code.invalid_employee_id,
            new ErrorRes("Invalid Data!",
                "Invalid Employee ID! Check employee ID again."));

        this.errors.set(this.code.invalid_date_param_format,
            new ErrorRes("Invalid Params Format!",
                "Invalid date param format (yyyymmdd)."));

        this.errors.set(this.code.invalid_order_id,
            new ErrorRes("Invalid Data!",
                "Order ID not found!"));

        this.errors.set(this.code.invalid_district_id,
            new ErrorRes("Invalid Data!",
                "District ID not found!"));

        this.errors.set(this.code.invalid_province_id,
            new ErrorRes("Invalid Data!",
                "Province ID not found!"));

        this.errors.set(this.code.no_return_in_root_process,
            new ErrorRes("Update unsuccessfully!",
                "Cannot return an order from the root transaction point!"));

        this.errors.set(this.code.repeated_data_update,
            new ErrorRes("Update unsuccessfully!",
                "New data is repeated!"));

        this.errors.set(this.code.invalid_data_order,
            new ErrorRes("Update unsuccessfully!",
                "Invalid Data Order!"));

        this.errors.set(this.code.invalid_commune_id,
            new ErrorRes("Invalid Data!",
                "Commune ID not found!"));

        this.errors.set(this.code.no_record_found,
            new ErrorRes("No record found!"));

        this.errors.set(this.code.invalid_password,
            new ErrorRes("Invalid Data!",
                "Wrong Password"));

        this.errors.set(this.code.invalid_refresh_token,
            new ErrorRes("Invalid refresh token"));

        this.errors.set(this.code.no_refresh_token,
            new ErrorRes("No refresh token"));
    }

    static errors = new Map();

    static getError(code) {
        let error = ErrorRes.clone(this.errors.get(code));
        error.code = code;
        return error;
    }

    static buildErrorRes(error, message) {
        return new ErrorRes(error, message)
    }
}

class ErrorRes {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
    static clone(errorRes) {
        return new ErrorRes(errorRes.error, errorRes.message);
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
}