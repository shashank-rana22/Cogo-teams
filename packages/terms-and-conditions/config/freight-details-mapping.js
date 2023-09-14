import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDocument } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import SERVICE_TYPES_MAPPING from './service-types-mapping';
import ShipmentIcon from './ShipmentIcon';

const FREIGHT_DETAILS_MAPPING = {
	service: {
		key   : 'service',
		label : 'Service',
		value : (item) => {
			const service = item?.service;

			return (
				<div>
					<div style={{ margin: '4px 4px 0px 0px' }}>
						{ <ShipmentIcon shipment_type={service} /> || <IcMDocument />}
					</div>

					{SERVICE_TYPES_MAPPING?.[service]?.label || '-'}
				</div>
			);
		},
		span: 1.3,
	},
	trade_type: {
		key   : 'trade_type',
		label : 'Trade Type',
		value : (item) => startCase(item?.trade_type),
		span  : 1.2,
	},
	line_name: {
		key   : 'line_name',
		label : '',
		value : (item) => item?.shipping_line?.short_name || item?.airline?.short_name,
		span  : 2,
	},
	country_name: {
		key   : 'country_name',
		label : 'Country',
		value : (item) => item?.country?.name,
		span  : 1.3,
	},
	paying_party_countries: {
		key   : 'paying_party_countries',
		label : 'Paying Party Countries',
		value : (item) => {
			const payingPartyLength = item?.paying_party_countries?.length;

			if (payingPartyLength === GLOBAL_CONSTANTS.zeroth_index) {
				return null;
			}

			return (
				<div>
					<div>
						{item.paying_party_countries?.[GLOBAL_CONSTANTS.zeroth_index]?.name}
						{' '}
						{payingPartyLength - GLOBAL_CONSTANTS.one > GLOBAL_CONSTANTS.zeroth_index
							? `(+${payingPartyLength - GLOBAL_CONSTANTS.one})` : null}
					</div>
				</div>
			);
		},
		span: 2.2,
	},
	updated_at: {
		key   : 'updated_at',
		label : 'Last updated on',
		value : (item) => format(
			item?.updated_at,
			GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		),

		span: 1.8,
	},
	last_updated_by: {
		key   : 'last_updated_by',
		label : 'Last updated by',
		value : (item) => item?.last_updated_by?.name,
		span  : 2,
	},
};

export default FREIGHT_DETAILS_MAPPING;
