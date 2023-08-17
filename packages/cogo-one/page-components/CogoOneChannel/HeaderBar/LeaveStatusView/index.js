import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import LeaveAgentModal from './LeaveAgentModal';
import styles from './styles.module.css';

function LeaveStatusView({ viewType = '', firestore = {} }) {
	const [showLeaveAgentModal, setShowLeaveAgentModal] = useState(false);

	return (
		<>
			<Image
				src={GLOBAL_CONSTANTS.image_url.agent_leave_status}
				height={22}
				width={22}
				className={styles.leave_agent_icon}
				alt="agent-status"
				onClick={() => setShowLeaveAgentModal(true)}
			/>

			{showLeaveAgentModal && (
				<LeaveAgentModal
					setShowLeaveAgentModal={setShowLeaveAgentModal}
					viewType={viewType}
					firestore={firestore}
				/>
			)}
		</>
	);
}

export default LeaveStatusView;
