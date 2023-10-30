const getPayload = ({ values = {}, id }) => {
	const {
		name,
		display_name,
		type,
		actual_location_type,
		postal_code,
		status,
		latitude,
		longitude,
		address,
		flag_icon_url,
		flag_image_url,
		zone_id,
		region_id,
		city_id,
		cluster_id,
		pincode_id,
		continent_id,
		trade_id,
		site_code,
		port_code,
		district_id,
		subdistrict_id,
		local_languages,
		country_id,
	} = values || {};

	const NEW_ALIASES = values?.aliases_attributes?.map((aliases) => ({ name: aliases?.name }));
	const formattedValues = {
		locality_id          : id,
		id                   : id || undefined,
		aliases_attributes   : NEW_ALIASES,
		display_name         : display_name || undefined,
		name,
		actual_location_type : actual_location_type || undefined,
		postal_code          : postal_code || undefined,
		district_id          : district_id || undefined,
		zone_id              : zone_id || undefined,
		type,
		city_id              : city_id || undefined,
		trade_id             : trade_id || undefined,
		port_code,
		site_code,
		cluster_id           : cluster_id || undefined,
		address,
		status,
		region_id            : region_id || undefined,
		local_languages,
		latitude,
		continent_id         : continent_id || undefined,
		longitude,
		flag_icon_url        : flag_icon_url?.finalUrl,
		flag_image_url       : flag_image_url?.finalUrl,
		country_id           : country_id || undefined,
		subdistrict_id       : subdistrict_id || undefined,
		pincode_id           : pincode_id || undefined,
		meta_data            : {},

	};
	return formattedValues;
};

export default getPayload;
