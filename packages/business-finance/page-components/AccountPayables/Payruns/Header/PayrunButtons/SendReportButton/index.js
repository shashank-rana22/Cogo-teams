import { Button } from '@cogoport/components';
import React from 'react';

import SendReportModal from '../SendReportModal';

function SendReportButton({ showReport = false, setShowReport = () => {}, activePayrunTab = '', itemData = {} }) {
	return (
		<div>
			<Button themeType="secondary" onClick={() => setShowReport(true)}>
				SEND REPORT
			</Button>
			{showReport ? (
				<SendReportModal
					showReport={showReport}
					setShowReport={setShowReport}
					activePayrunTab={activePayrunTab}
					itemData={itemData}
				/>
			) : null}
		</div>
	);
}

export default SendReportButton;
