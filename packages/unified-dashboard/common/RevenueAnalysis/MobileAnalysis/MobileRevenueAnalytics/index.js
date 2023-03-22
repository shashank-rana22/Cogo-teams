import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';

import mobileGetNextData from '../../../../utils/mobileGetNextData';
import mobileGetPreviousData from '../../../../utils/mobileGetPreviousData';
import mobileNextArrowAllowed from '../../../../utils/mobileNextArrowAllowed';

import styles from './styles.module.css';

function MobileBookingAnalysis({
	selectedFilterTab = 'month',
	param,
	setParam,
	revenue_analysis,
	etd,
}) {
	const isClickable = mobileNextArrowAllowed(
		selectedFilterTab,
		revenue_analysis,
		etd,
	);

	const handleMonth = () => {
		if (!isClickable) {
			mobileGetNextData(
				revenue_analysis[0],
				param,
				setParam,
			);
		}
	};

	return (
		<div className={styles.row}>
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
				onClick={handleMonth}
			/>
		</div>
	);
}

export default MobileBookingAnalysis;
