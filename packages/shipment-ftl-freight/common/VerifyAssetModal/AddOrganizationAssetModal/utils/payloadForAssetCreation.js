export const formattedValuesForAsset = (values = {}) => {
	const payload = {
		name                   : values.name,
		organization_branch_id : values.organization_branch_id,
		asset_type             : values.asset_type,
		image_url              : values.image_url,
		data                   : {
			truck_number              : values.truck_number,
			owner_name                : values.owner_name,
			asset_registration_number : values.asset_registration_number,
			registration_date         : values.registration_date,
			rc_valid_till             : values.rc_valid_till,
			vehicle_category          : values.vehicle_category,
			vehicle_type              : values.vehicle_type,
			insurance_policy_type     : values.insurance_policy_type,
			insurance_policy_number   : values.insurance_policy_number,
			insurance_valid_till      : values.insurance_valid_till,
		},
	};

	return payload;
};
