import { Popover } from '@cogoport/components';
import { IcMArrowLeft, IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

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
	const [showPopover, setShowPopover] = useState(false);

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
						setShowPopover={setShowPopover}
					/>
				)}
				visible={showPopover}
				onClickOutside={() => setShowPopover(false)}
			>
				<IcMOverflowDot
					className={styles.overflow_menu}
					onClick={() => setShowPopover((prev) => !prev)}
				/>
			</Popover>
		</div>
	);
}

export default MobileHeader;
