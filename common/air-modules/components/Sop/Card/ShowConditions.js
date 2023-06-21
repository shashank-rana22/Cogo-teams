const CONDITIONS_KEYS = [
	'shipper_trade_party_id',
	'consignee_trade_party_id',
	'commodity',
	'origin_country_id',
	'destination_country_id',
	'country_id',
];

const CHECK_LENGTH = 1;

function ShowConditions({
	sopData,
	trade_partners_details,
	primary_service,
}) {
	const values = {
		shipper_trade_party_id: `Shipper is ${trade_partners_details?.shipper?.name}`,

		consignee_trade_party_id : `Consignee is ${trade_partners_details?.consignee?.name}`,
		commodity                : `Commodity is ${primary_service?.commodity_description}`,
		origin_country_id        : `Origin is ${
			(primary_service?.origin_port || primary_service?.origin_airport)?.country
				?.name
		}`,
		destination_country_id: `Destination is ${
			(
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.name
		}`,
		country_id: `Country is ${
			(primary_service?.origin_port || primary_service?.origin_airport)?.country
				?.name
		}`,
	};

	const keys = Object.keys(sopData);
	const CONDITIONS = [];

	keys.forEach((key) => {
		if (CONDITIONS_KEYS.includes(key)) {
			if (sopData[key]) {
				CONDITIONS.push(values[key]);
			}
		}
	});

	return (
		<>
			{CONDITIONS.map((label, index) => (
				<span style={{ fontSize: '12px' }} key={label}>
					{`${label}`}
					{' '}
					{index !== CONDITIONS.length - CHECK_LENGTH ? ', ' : ''}
				</span>
			))}
		</>
	);
}

export default ShowConditions;
