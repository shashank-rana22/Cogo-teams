import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';

import getNextData from '../../../../utils/getNextData';
import getPreviousData from '../../../../utils/getPreviousData';
import isNextRevenueAllowed from '../../../../utils/isNextRevenueAllowed';
import mobileGetNextData from '../../../../utils/mobileGetNextData';
import mobileGetPreviousData from '../../../../utils/mobileGetPreviousData';
import mobileNextArrowAllowed from '../../../../utils/mobileNextArrowAllowed';

import styles from './styles.module.css';

function MobileBookingAnalysis({
	selectedFilter,
	selectedFilterTab = 'month',
	headerFilters,
	revenue,
	param,
	setParam,
	loading,
	revenue_analysis,
	etd,
	heading,
}) {
	const rev = revenue_analysis[0] || [];

	const isClickable = mobileNextArrowAllowed(
		selectedFilterTab,
		revenue_analysis,
		etd,
	);
	return (
		<div className={styles.row}>
			{console.log('revenue', revenue_analysis)}
			<IcMArrowLeft
				onClick={() => mobileGetPreviousData(
					revenue_analysis[0],
					param,
					setParam,
				)}
				className={styles.btn_pointer}
			/>

			<div className={styles.revenue_col}>
				{revenue_analysis[0]?.month}
				(
				{revenue_analysis[0]?.year}
				)
			</div>

			<IcMArrowRight
				className={isClickable ? `${styles.btn_na}` : `${styles.btn_pointer}`}
				onClick={
					isClickable
						? () => {}
						: () => mobileGetNextData(
							revenue_analysis[0],
							param,
							setParam,
						)
				}
			/>

		</div>
	);
}

export default MobileBookingAnalysis;
