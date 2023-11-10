import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';

import TooltipContent from './tooltipContent';

const getFormattedAmt = ({ currency, amount }) => formatAmount({
	currency,
	amount,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

const itemFunction = {
	renderDate: (item, config) => (
		formatDate({
			date       : item[config?.key],
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yy'],
			formatType : 'date',
		})
	),
	renderTotalAmt: (item) => {
		const {
			currency,

			total_amount = 0,
		} = item || {};

		return (
			<div className="total_amt">
				<span>
					{getFormattedAmt({ currency, amount: total_amount })}
				</span>
				<Tooltip content={<TooltipContent item={item} />}>
					<div className="info_icon"><IcMInfo /></div>
				</Tooltip>
			</div>
		);
	},
	renderOrderPlanName: (item) => {
		const { plan } = item || {};

		return <span>{plan?.display_name}</span>;
	},
	renderPerformedBy: (item) => {
		const { user = {} } = item || {};
		const { email, name } = user || {};

		return (
			<Tooltip content={email}>
				<span>{name}</span>
			</Tooltip>
		);
	},
};

export default itemFunction;
