import { Modal } from '@cogoport/components';
import React from 'react';

import ApproveAndRejectHeader from '../../ApproveAndRejectHeader';

import styles from './styles.module.css';

function AdvanceDepositCommonModal({
	securityDepositDetails,
	itemData,
	showModal,
	setShowModal,
	type,
}) {
	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => {
				setShowModal(false);
			}}
		>
			<Modal.Header title={type === 'SecurityDeposit'
				? 'Advance Container Security Deposit' : 'Advance Container Security Deposit Refund'}
			/>
			<Modal.Body>
				<ApproveAndRejectHeader row={itemData} />
				{securityDepositDetails.map((itm) => {
					const { title, value } = itm || {};
					return (
						<div key={title} className={styles.flex}>
							<div className={styles.title}>
								{title}
							</div>
							<div className={styles.divider}>
								:
							</div>
							<div className={styles.name}>
								<div>{value}</div>
							</div>
						</div>
					);
				})	}

			</Modal.Body>
		</Modal>
	);
}

export default AdvanceDepositCommonModal;
