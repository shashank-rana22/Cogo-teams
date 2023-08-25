import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function PieChartLegends({ data, listTitle }) {
	const { valueTitle } = listTitle;
	const { zeroth_index } = GLOBAL_CONSTANTS || {};
	return (
		<div className={styles.overflow_wrapper}>
			{(data || []).map((item) => (
				<Tooltip
					key={item?.label}
					theme="light"
					placement="left"
					content={(
						<div className={styles.title}>
							{valueTitle}
							<div className={styles.amount}>
								{formatAmount({
									amount   : item.value || zeroth_index,
									currency : 'INR',
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										minimumFractionDigits : 0,
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					)}
				>
					<div className={styles.title}>
						<div className={styles.color_dot} />
						{item.label}
					</div>
				</Tooltip>
			))}
		</div>
	);
}

export default PieChartLegends;
