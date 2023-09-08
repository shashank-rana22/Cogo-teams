// import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals';
import { Flex, Text, ToolTip } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import SERVICE_TYPES_MAPPING from './service-types-mapping';

function GetToolTipContent({ list = [] }) {
	return (
		<div>
			{list.map((countryObj, i) => (
				<div
					key={countryObj.id}
					color="#393f70"
					size={12}
					paddingBottom={i === list.length - 1 ? 0 : 4}
				>
					{i + 1}
					.
					{countryObj.name}
				</div>
			))}
		</div>
	);
}

const FREIGHT_DETAILS_MAPPING = {
	service: {
		key   : 'service',
		label : 'Service',
		value : (item) => {
			const service = item?.service;

			return (
				<div alignItems="center">
					<div style={{ margin: '4px 4px 0px 0px' }}>
						{SERVICE_TYPES_MAPPING?.[service]?.svgComponent || <IcMDocument />}
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

			if (payingPartyLength === 0) {
				return null;
			}

			return (
				<div
					placement="left"
					maxWidth="none"
					theme="light-border"
					interactive
					content={GetToolTipContent({ list: item.paying_party_countries })}
				>
					<div size={12} color="#5936f0" marginTop={4}>
						{item.paying_party_countries?.[0]?.name}
						{' '}
						{payingPartyLength - 1 > 0 ? `(+${payingPartyLength - 1})` : null}
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
			// dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			 'yyyy-MM-dd',
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
