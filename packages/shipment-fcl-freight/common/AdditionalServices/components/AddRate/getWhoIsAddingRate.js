const getWhoIsAddingRate = ({ isSeller, item, status }) => {
	let whoIsAddingRate = '';
	if (!isSeller && (!item?.buy_price || !item?.id)) {
		whoIsAddingRate = 'okam_create';
	}
	if (!isSeller && item?.buy_price && item?.id) {
		whoIsAddingRate = 'okam_update';
	}
	if (isSeller && !item.buy_price) {
		whoIsAddingRate = 'so_create';
	}
	if (['requested_for_service_provider', 'cancelled_by_supplier'].includes(status?.status)) {
		whoIsAddingRate = 'so_update';
	}
	return whoIsAddingRate;
};

export default getWhoIsAddingRate;
