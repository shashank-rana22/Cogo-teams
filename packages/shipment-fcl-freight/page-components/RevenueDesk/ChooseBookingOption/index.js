import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import Header from './Header';
import styles from './styles.module.css';

function ChooseBookingOption({
	activeTab,
	currentShipmentData,
	setShowBookingOption,
	statsLoading,
	data = {},
	children = null,
}) {
	const dataCount = data.list?.length;
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<Button
					themeType="tertiary"
					className={styles.back_container}
					onClick={() => setShowBookingOption(false)}
				>
					<div className={styles.back_icon}>
						<IcMArrowBack width={20} height={20} />
					</div>
					{'  Back to Bookings'}

				</Button>

				<Header
					data={currentShipmentData}
					activeTab={activeTab}
					expanded={dataCount > 0}
					statsLoading={statsLoading}
					stats={data.list}
					currentShipmentData={currentShipmentData}
				/>
				{children}
			</div>
		</div>

	);
}

export default ChooseBookingOption;
