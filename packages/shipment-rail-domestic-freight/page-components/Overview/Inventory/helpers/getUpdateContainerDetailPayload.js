const getUpdateContainerDetailPayload = ({ routeList = [] }) => ({
	shipment_type : 'rail_domestic',
	update_data   : (routeList || []).reduce((acc, val) => {
		if (val.name === 'Transit') return acc;
		return [
			...acc,
			{
				id   : val?.id,
				data : {
					container_number : val?.container_number,
					movement_type    : val?.isChecked?.static ? 'static' : 'in_transit',
					origin_location_id:
                            val?.isChecked?.item?.origin_location_id
                            || val?.origin_location_id
                            || undefined,
					loading_status          : val?.loading_status,
					destination_location_id : val?.isChecked?.static
						? undefined
						: val?.isChecked?.item?.destination_location_id
                              || val?.destination_location_id
                              || undefined,
				},
			},
		];
	}, []),
});

export default getUpdateContainerDetailPayload;
