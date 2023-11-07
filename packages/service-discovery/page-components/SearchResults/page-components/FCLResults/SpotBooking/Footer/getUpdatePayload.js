const getUpdatePayload = ({ checkoutData = {}, basicFreightValues = {} }) => {
	const { detail = {} } = checkoutData;

	const { services = {}, primary_service = '', id = '' } = detail;

	const primaryServices = Object.values(services).filter(
		(item) => item.service_type === primary_service,
	);

	const payload = {
		id,
		line_items_to_add: primaryServices.reduce((acc, cur) => ({
			...acc,
			[cur.id]: [{
				code : 'BAS',
				unit : 'per_container',
				...(basicFreightValues[`bas_${cur.container_size}_${cur.container_type}_${cur.commodity}`]),
			}],
		}), {}),
	};

	return payload;
};

export default getUpdatePayload;
