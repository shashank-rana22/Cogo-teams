import { IcMArrowLeft } from '@cogoport/icons-react';
import React from 'react';

import HeaderName from '../../../../../../common/HeaderName';
import EmailHeader from '../ChatControls/emailHeader';

import styles from './styles.module.css';

function MobileHeader({
	formattedData = {},
	setActiveTab = () => {},
	channelType = '',
}) {
	return (
		<div className={styles.header}>
			<IcMArrowLeft
				className={styles.arrow_back}
				onClick={() => setActiveTab(
					(prev) => ({
						...prev,
						data: {},
					}),
				)}
			/>
			{channelType === 'email'
				? <EmailHeader formattedData={formattedData} />
				: (
					<HeaderName
						formattedData={formattedData}
						isMobile
					/>
				)}
		</div>
	);
}

export default MobileHeader;
