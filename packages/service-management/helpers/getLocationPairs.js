const getLocationPairs = ({ data }) => {
	const locationPairs = data?.service_data?.location_pairs.map((item) => {
		const keys = Object.keys(item);
		if (keys.includes('location_id')) {
			return {
				location_id : item?.location_id,
				trade_type  : item?.trade_type,
				total_teus  : item?.total_teus,
				user_id     : item?.user_id,
			};
		}
		return {
			origin_location_id      : item?.origin_location_id,
			destination_location_id : item?.destination_location_id,
			total_teus              : item?.total_teus,
			user_id                 : item?.user_id,
		};
	});
	return locationPairs;
};
export default getLocationPairs;
