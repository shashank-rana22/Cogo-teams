import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function TooltipAmount({ amount, currencyType }) {
	return (
		<Tooltip
			content={formatAmount({
				amount   : amount as any,
				currency : currencyType,
				options  : {
					currencyDisplay : 'code',
					style           : 'currency',
				},
			})}
			placement="top"
			interactive
		>
			<div className={styles.value}>
				{' '}
				{formatAmount({
					amount   : amount as any,
					currency : currencyType,
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
						notation        : 'compact',
						compactDisplay  : 'short',
					},
				})}
			</div>
		</Tooltip>
	);
}

export default TooltipAmount;
