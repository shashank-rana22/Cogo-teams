import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatFclLocal = (data, user_id, listData, PortName) => {
	const geo = getGeoConstants();
	const {
		trade_type, container_size, container_type, shipping_line_id,
		port_id, main_port_id,
	} = listData || data || {};

	const finalPortId = (PortName === 'Origin' ? data?.origin_port_id : data?.destination_port_id) || undefined;

	const localkey = PortName === 'Origin' ? 'origin_local' : 'destination_local';

	const payloadRequired = {
		trade_type,
		container_size,
		container_type,
		service_provider_id : geo.uuid.cogoxpress_id,
		main_port_id,
		shipping_line_id,
		procured_by_id      : user_id,
		sourced_by_id       : GLOBAL_CONSTANTS.uuid.rishi_user_id,
		port_id             : finalPortId || port_id,
		[localkey]          : {
			line_items: data?.line_items?.map((charges) => ({
				...charges,
				price  : Number(charges.price),
				remark : charges?.remark ? [charges.remark] : undefined,
			})),
		},
		detention: {
			free_limit : data?.detention_free_days,
			slabs      : data?.detention_days?.map((charges) => ({
				...charges,
				price  : Number(charges.price),
				remark : charges?.remark ? [charges.remark] : undefined,
			})),
		},
		demurrage: {
			free_limit : data?.detention_free_days,
			slabs      : data?.demurrage_days?.map((charges) => ({
				...charges,
				price  : Number(charges.price),
				remark : charges?.remark ? [charges.remark] : undefined,
			})),
		},

	};

	return payloadRequired;
};

export default formatFclLocal;
