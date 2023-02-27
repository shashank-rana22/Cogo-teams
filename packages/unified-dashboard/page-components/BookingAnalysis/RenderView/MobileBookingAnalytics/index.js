import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';

import mobileGetNextData from '../../../../utils/mobileGetNextData';
import mobileGetPreviousData from '../../../../utils/mobileGetPreviousData';
import mobileNextArrowAllowed from '../../../../utils/mobileNextArrowAllowed';

import styles from './styles.module.css';

function MobileBookingAnalysis({
	setFilters = {},
	filters = {},
	maxEtd = '',
	data = [],
	selectedFilterTab,
}) {
	const isClickable = mobileNextArrowAllowed(selectedFilterTab, data, maxEtd);

	return (
		<div className={styles.row}>

			<IcMArrowLeft
				onClick={() => mobileGetPreviousData(data, filters, setFilters)}
				className={styles.btn_pointer}
			/>

			<div className={styles.revenue_col}>
				{data?.[data.length - 1]?.month}
				(
				{data?.[data.length - 1]?.year}
				)
			</div>

			<IcMArrowRight
				className={isClickable ? `${styles.btn_na}` : `${styles.btn_pointer}`}
				onClick={
					isClickable
						? () => {}
						: () => mobileGetNextData(data, filters, setFilters)
				}
			/>

		</div>
	);
}

export default MobileBookingAnalysis;
