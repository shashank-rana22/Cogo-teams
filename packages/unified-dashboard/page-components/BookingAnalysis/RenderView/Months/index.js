import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';

import getMonthYear from '../../../../utils/getMonthYear';
import getNextData from '../../../../utils/getNextData';
import getPreviousData from '../../../../utils/getPreviousData';
import isNextArrowAllowed from '../../../../utils/isNextArrowAllowed';
import ShowMonths from '../../../../utils/showMonths';

import styles from './styles.module.css';

function Months({
	setFilters = {},
	filters = {},
	data = [],
	maxEtd = '',
	selectedFilterTab,
}) {
	const isClickable = isNextArrowAllowed(selectedFilterTab, data, maxEtd);

	return (
		<div className={styles.container}>
			<div className={styles.flex_arrow}>

				<IcMArrowLeft
					onClick={() => getPreviousData(selectedFilterTab, data, filters, setFilters)}
					className={styles.btn_pointer}
				/>

				<div className={styles.stepper_line} />

				<IcMArrowRight
					className={isClickable ? `${styles.btn_na}` : `${styles.btn_pointer}`}
					onClick={
					isClickable
						? () => {}
						: () => getNextData(selectedFilterTab, data, filters, setFilters)
				}
				/>

			</div>

			<div className={styles.flex_months}>
				{(data || []).map((months) => (
					<div className={styles.month_container}>
						<ShowMonths selectedFilterTab={selectedFilterTab} value={months} />
						<div className={styles.stepper_dots_top} />
						{(selectedFilterTab === 'month'
							&& `${getMonthYear().getMonth}${getMonthYear().getYear}`)
							=== `${months.month}${months.year}` && (
								<div className={styles.text_month}>
									Current Month
								</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Months;
