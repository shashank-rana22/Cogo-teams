const sopConditions = (primary_service, trade_partners_details) => {
	const preConditions = [
		{
			label : `Shipper is ${trade_partners_details?.shipper?.name}`,
			value : 'shipper',
		},
		{
			label : `Consignee is ${trade_partners_details?.consignee?.name}`,
			value : 'consignee',
		},
		{
			label : `Commodity is ${primary_service?.commodity_description}`,
			value : 'commodity',
		},
		{
			label: `Origin is ${
				(primary_service?.origin_port || primary_service?.origin_airport)
					?.country?.name
			}`,
			value: 'origin',
		},
		{
			label: `Destination is ${
				(
					primary_service?.destination_port
					|| primary_service?.destination_airport
				)?.country?.name
			}`,
			value: 'destination',
		},
	];

	const originCountryID = (
		primary_service?.origin_port || primary_service?.origin_airport
	)?.country?.country_id;

	const destinationCountryID = (
		primary_service?.destination_port || primary_service?.destination_airport
	)?.country?.country_id;

	const isDomesic = originCountryID === destinationCountryID;

	if (isDomesic) {
		preConditions.push({
			label: `Country is ${
				(primary_service?.origin_port || primary_service?.origin_airport)
					?.country?.name
			}`,
			value: 'country',
		});
	}

	const conditions_values = {
		shipper: {
			data: trade_partners_details?.shipper?.trade_party_id,
		},

		consignee: {
			data: trade_partners_details?.consignee?.trade_party_id,
		},

		commodity: {
			data: primary_service?.commodity_description,
		},

		origin: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
		},

		destination: {
			data: (
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.country_id,
		},

		country: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'country',
		},
	};

	const conditions = [];
	preConditions.forEach((condition) => {
		if (conditions_values[condition.value].data) {
			conditions.push(condition);
		}
	});
	return conditions;
};

export default sopConditions;
