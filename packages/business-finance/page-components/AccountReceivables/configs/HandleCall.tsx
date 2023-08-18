import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import DialCallModal from '../components/Outstanding/OutstandingList/Communication/DialCallModal';

function HandleCall({ row }) {
	const [showDialModal, setShowDialModal] = useState(false);

	const onClick = () => setShowDialModal(true);

	return (
		<div>
			<Image
				onClick={onClick}
				src={GLOBAL_CONSTANTS.image_url.call_icon}
				alt="call icon"
				role="presentation"
				height={35}
				width={35}
			/>
			<DialCallModal
				setShowDialModal={setShowDialModal}
				showDialModal={showDialModal}
				row={row}
			/>
		</div>
	);
}

export default HandleCall;
