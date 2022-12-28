import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import Header from './Header';
import styles from './styles.module.css';

function ChooseBookingOption({
	activeTab,
	currentShipmentData,
	setShowBookingOption,
	statsLoading,
	data,
	children = null,
}) {
	const dataCount = data?.list?.length;
	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<div
					className={styles.backContainer}
					onClick={() => setShowBookingOption(false)}
				>
					<IcMArrowBack width={20} height={20} />
					{' '}
					Back to Bookings
				</div>
				<Header
					data={currentShipmentData}
					activeTab={activeTab}
					expanded={dataCount > 0}
					statsLoading={statsLoading}
					stats={data?.list}
					currentShipmentData={currentShipmentData}
				/>
				{children}
			</div>
		</div>

	);
}

export default ChooseBookingOption;
