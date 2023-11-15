import { Popover } from '@cogoport/components';
import { IcMArrowLeft, IcMOverflowDot } from '@cogoport/icons-react';
import React from 'react';

import HeaderName from '../../../../../../common/HeaderName';
import EmailHeader from '../ChatControls/emailHeader';

import OptionsContainer from './OptionsContainer';
import styles from './styles.module.css';

function MobileHeader(props) {
	const {
		formattedData = {},
		setActiveTab = () => {},
		channelType = '',
	} = props || {};

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
						setActiveTab={setActiveTab}
					/>
				)}

			<Popover
				placement="bottom-end"
				render={(
					<OptionsContainer
						{...props}
					/>
				)}
			>
				<IcMOverflowDot className={styles.overflow_menu} />
			</Popover>
		</div>
	);
}

export default MobileHeader;
