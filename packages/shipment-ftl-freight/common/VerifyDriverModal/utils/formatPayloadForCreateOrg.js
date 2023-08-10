const formattedValuesForDriver = (values = {}) => {
	const payload = {
		poc_type               : 'truck_driver',
		name                   : values.name,
		email                  : values.email,
		organization_branch_id : values.organization_branch_id,
		mobile_country_code    : values.mobile_country_code,
		mobile_number          : values.mobile_number,
		data                   : {
			dob                      : values.dob,
			address                  : values.address,
			pincode                  : values.pincode,
			address_proof_type       : values.address_proof_type,
			address_proof_number     : values.address_proof_number,
			address_proof_document   : values.address_proof_document,
			pan_number               : values.pan_number,
			pan_url                  : values.pan_url,
			dl_number                : values.dl_number,
			last_date_of_validity_dl : values.last_date_of_validity_dl,
			driver_license_type      : values.driver_license_type,
			driving_license_document : values.driving_license_document,
			bank_account_details     : {
				account_holder_name : values.account_holder_name,
				bank_name           : values.bank_name,
				branch_name         : values.branch_name,
				bank_account_number : values.bank_account_number,
				ifsc_number         : values.ifsc_number,
				cancelled_cheque    : values.cancelled_cheque,
			},
		},
	};

	return payload;
};

export default formattedValuesForDriver;
