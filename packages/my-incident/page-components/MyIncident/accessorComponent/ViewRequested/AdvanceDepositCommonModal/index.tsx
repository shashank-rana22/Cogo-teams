import { Modal } from '@cogoport/components';
import React from 'react';

import ApproveAndRejectHeader from '../../ApproveAndRejectHeader';

import styles from './styles.module.css';

interface DetailsInterface {
	title?:string,
	value?:any,
}
interface Props {
	itemData?: object,
	showModal?: boolean,
	setShowModal?:React.Dispatch<React.SetStateAction<boolean>>,
	type?:string,
	securityDepositDetails?: DetailsInterface[],
}

function AdvanceDepositCommonModal({
	securityDepositDetails,
	itemData,
	showModal,
	setShowModal,
	type,
}:Props) {
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
