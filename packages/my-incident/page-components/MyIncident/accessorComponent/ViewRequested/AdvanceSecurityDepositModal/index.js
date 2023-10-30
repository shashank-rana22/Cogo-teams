import { Button } from '@cogoport/components';
import React from 'react';

import AdvanceDepositCommonModal from '../AdvanceDepositCommonModal';

import securityDepositData from './securityDepositData';

function AdvanceSecurityDepositModal({ itemData, showModal, setShowModal }) {
	const { status, data } = itemData || {};
	const { advanceSecurityDeposit } = data || {};

	return (
		<div>
			{status === 'REJECTED'
				&& <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>}
			{status === 'APPROVED'
            && <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}

			{showModal
			&& (
				<AdvanceDepositCommonModal
					securityDepositDetails={securityDepositData({ advanceSecurityDeposit })}
					itemData={itemData}
					showModal={showModal}
					setShowModal={setShowModal}
					type="SecurityDeposit"
				/>
			)}
		</div>
	);
}

export default AdvanceSecurityDepositModal;
