import { RadioGroup, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

const format = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType : 'date',
});

function SailingWeek({
	cogoAssuredRates = [],
	onChange = () => {},
	selectedCogoAssuredCard = {},
	source = '',
}) {
	const cogoAssuredOptions = useMemo(() => cogoAssuredRates.map((rateItem) => {
		const { id = '', freight_price_currency, freight_price_discounted = 0, schedules = {} } = rateItem;

		const { validity_start, validity_end } = schedules;

		return {
			name  : id,
			value : id,
			label : (
				<div className={styles.option_container}>
					<span className={styles.sailing_week}>
						{`${format(validity_start)} to ${format(validity_end)}`}
					</span>

					<span className={styles.freight_price}>
						{formatAmount({
							amount   : freight_price_discounted,
							currency : freight_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
			),
		};
	}), [cogoAssuredRates]);

	if (isEmpty(cogoAssuredOptions)) {
		return null;
	}

	return (
		<div className={cl`${styles.container} ${source !== 'banner' && styles.rate_card}`}>
			<div className={styles.heading}>Select Sailing Week</div>

			<div className={styles.radio_group}>
				<RadioGroup
					options={cogoAssuredOptions}
					onChange={onChange}
					value={selectedCogoAssuredCard}
				/>
			</div>
		</div>
	);
}

export default SailingWeek;
