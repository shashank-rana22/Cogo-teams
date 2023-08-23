import { IcMCall } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DialCallModal from '../components/Outstanding/OutstandingList/Communication/DialCallModal';

function HandleCall({ row = {}, orgData = {} }) {
	const [showDialModal, setShowDialModal] = useState(false);

	return (
		<div>
			<IcMCall
				height={18}
				width={18}
				fill="#f68b21"
				style={{ cursor: 'pointer' }}
				onClick={() => setShowDialModal(true)}
			/>
			<DialCallModal
				setShowDialModal={setShowDialModal}
				showDialModal={showDialModal}
				row={row}
				orgData={orgData}
			/>
		</div>
	);
}

export default HandleCall;
