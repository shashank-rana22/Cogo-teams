import { IcMCall } from '@cogoport/icons-react';
import React, { useState } from 'react';

import LogModal from '../components/Outstanding/LogModal';
import DialCallModal from '../components/Outstanding/OutstandingList/Communication/DialCallModal';

function HandleCall({ row }) {
	const [showDialModal, setShowDialModal] = useState(false);
	const [showLog, setShowLog] = useState(false);

	const onClick = () => setShowDialModal(true);

	return (
		<div>
			<IcMCall height={18} width={18} fill="#f68b21" style={{ cursor: 'pointer' }} onClick={onClick} />
			<DialCallModal
				setShowDialModal={setShowDialModal}
				showDialModal={showDialModal}
				row={row}
				setShowLog={setShowLog}
			/>

			<LogModal showLog={showLog} setShowLog={setShowLog} />
		</div>
	);
}

export default HandleCall;
