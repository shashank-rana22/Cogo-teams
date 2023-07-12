import { Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMInfo } from '@cogoport/icons-react';

import currencyOptions from './helpers/currencies';

const geo = getGeoConstants();

function ConsignmentValueLabel() {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<span>Consignment Value</span>

			<div style={{ marginLeft: '4px' }}>
				<Tooltip
					interactive
					placement="bottom"
					content={<div>Consignment Value should not be greater than 5 Crores INR.</div>}
				>
					<IcMInfo />
				</Tooltip>
			</div>
		</div>
	);
}

const renderLabel = (option) => {
	const { commodity = '', subCommodity = '' } = option || {};

	return (
		<span>
			{commodity}
			<br />
			{`(${subCommodity})`}
		</span>
	);
};

const controls = [
	{
		name        : 'cargo_insurance_commodity',
		label       : 'Commodity',
		type        : 'async-select',
		placeholder : 'Select Commodity',
		asyncKey    : 'insurance_commodities',
		initialCall : true,
		valueKey    : 'id',
		lableKey    : 'commodity',
		renderLabel,
		span        : 12,
		rules       : { required: true },
	},
	{
		name  : 'cargo_insurance_commodity_description',
		label : 'Commodity Description',
		type  : 'text',
		span  : 12,
		rules : { required: true },
	},
	{
		name    : 'cargo_value_currency',
		label   : 'Currency',
		type    : 'select',
		span    : 4,
		options : currencyOptions,
		value   : `${geo?.country?.currency?.code}`,
		rules   : { required: true },
	},
	{
		name  : 'cargo_value',
		label : <ConsignmentValueLabel />,
		type  : 'number',
		span  : 8,
		rules : {
			required : true,
			min      : 0,
		},
	},
];
export default controls;
