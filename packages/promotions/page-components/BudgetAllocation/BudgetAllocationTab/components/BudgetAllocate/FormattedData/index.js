import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ActionButtons from './ActionButtons';
import styles from './styles.module.css';

const FREQUENCY_MAPPING = {
	week    : 'Weekly',
	month   : 'Monthly',
	year    : 'Yearly',
	quarter : 'Quarterly',
};
const HUNDERED = 100;
const ZERO = 0;

const formattedData = ({
	promoBudgetList,
	setShowViewModal,
	setSelectedDetails,
	refetch,
}) => {
	const formattedDataList = (promoBudgetList || []).map((item) => {
		const DEFAULT_TOTAL_USED = 0;
		const DEFAULT_TOTAL_BUDGET = 0;
		const totalUsed = item?.total_used || DEFAULT_TOTAL_USED;
		const totalBudget = item?.total_budget || DEFAULT_TOTAL_BUDGET;
		const usagePercentage = (totalUsed / totalBudget) * HUNDERED;
		let utilized_percent = Math.round(usagePercentage);
		if (utilized_percent === undefined || utilized_percent < ZERO) {
			utilized_percent = ZERO;
		} else if (utilized_percent >= HUNDERED) {
			utilized_percent = HUNDERED;
		}
		const handleView = (val) => {
			setSelectedDetails(val);
			setShowViewModal(true);
		};

		return {
			name         : <div className={styles.title}>{startCase(item?.name)}</div>,
			user_count   : <div className={styles.title}>{item?.user_count}</div>,
			total_budget : (
				<div className={styles.div}>
					<div className={styles.amount_div}>
						<div className={styles.sub_text}>TOTAL</div>
						<div className={styles.amount}>
							{formatAmount({
								amount   : item?.total_budget || ZERO,
								currency : item?.budget_amount_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</div>
					</div>
					<div className={styles.budget_bar} direction="column">
						<div className={styles.empty_bar}>
							<div
								className={styles.filled_bar}
								style={{
									width    : `calc(${utilized_percent}%)`,
									maxWidth : '100%',
								}}
							/>
							<div
								className={styles.progress_indicator}
								style={{
									left: `calc(${utilized_percent}% - 5px)`,
								}}
							/>
						</div>
						<div className={styles.amount_div}>
							<div className={styles.sub_text}>USED</div>
							<div className={styles.amount}>
								{formatAmount({
									amount   : item?.total_used || ZERO,
									currency : item?.budget_amount_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					</div>
				</div>
			),

			frequency: (
				<div className={styles.title}>
					{startCase(FREQUENCY_MAPPING[item?.frequency])}
				</div>
			),
			validity_start: (
				<div className={styles.title}>
					{formatDate({
						date       : item?.updated_at,
						formatType : 'date',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					}) || '-'}
				</div>
			),
			status: (
				<div className={styles.flex}>
					<ActionButtons item={item} refetch={refetch} />
				</div>
			),
			dots: (
				<div className={styles.flex}>
					{item?.status === 'active' ? (
						<IcMEyeopen
							style={{ cursor: 'pointer' }}
							onClick={() => handleView(item)}
						/>
					) : null}
				</div>
			),
		};
	});
	return formattedDataList;
};

export default formattedData;
