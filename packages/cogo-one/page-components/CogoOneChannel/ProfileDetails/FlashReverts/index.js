import { cl } from '@cogoport/components';

import REVERT_RATE_FILTERS from '../../../../constants/revertRatesFIlterMapping';
import useListShipmentFlashBookingRates from '../../../../hooks/useListShipmentFlashBookingRates';

import Card from './Card';
import styles from './styles.module.css';

export default function FlashReverts({ orgId = '', accountType = '' }) {
	const {
		data,
		loading,
		setActiveTab,
	} = useListShipmentFlashBookingRates({ orgId, accountType });

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				{REVERT_RATE_FILTERS.map((eachItem) => (
					<div
						role="button"
						tabIndex={0}
						key={eachItem.value}
						className={cl`${styles.each_filter} ${loading ? styles.on_loading : ''}`}
						onClick={() => setActiveTab(eachItem.value)}
					>
						{eachItem.title}
					</div>
				))}
			</div>
			<div className={styles.list}><Card data={data} /></div>
		</div>
	);
}
