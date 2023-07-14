import { Modal, Button, Textarea } from '@cogoport/components';
import React from 'react';

import ApproveAndReject from '../../common/ApproveAndRejectData';

import styles from './styles.module.css';

interface DetailsInterface {
	title?:string,
	value?:any,
}
interface Props {
	securityDepositDetails?:DetailsInterface[],
	showDepositModal?: boolean,
	setShowDepositModal?:React.Dispatch<React.SetStateAction<boolean>>,
	isEditable?:boolean,
	row?:object,
	getData?:Function,
	loading?:boolean,
	setRemarkValue?:React.Dispatch<React.SetStateAction<string>>,
	type?:string,
}
function SecurityDepositCommonModal({
	securityDepositDetails,
	showDepositModal,
	setShowDepositModal,
	isEditable,
	row,
	getData,
	loading,
	setRemarkValue,
	type,
}:Props) {
	return (
		<Modal
			size="md"
			show={showDepositModal}
			onClose={() => {
				setShowDepositModal(false);
			}}
		>
			<Modal.Header title={type === 'SecurityDeposit'
				? 'Advance Container Security Deposit' : 'Advance Container Security Deposit Refund'}
			/>
			<Modal.Body>
				{!isEditable && <ApproveAndReject row={row} />}
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
								<div>{value || ''}</div>
							</div>
						</div>
					);
				})}

				{isEditable && (
					<>
						<div className={styles.remarks}>Remarks*</div>
						<Textarea
							name="remark"
							size="md"
							rows={4}
							cols={20}
							placeholder="Enter Remark Here..."
							onChange={(e: string) => setRemarkValue(e)}
						/>
					</>
				)}
			</Modal.Body>
			{isEditable && (
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: '8px' }}
							disabled={loading}
							onClick={() => {
								getData({ status: 'REJECTED' });
							}}
						>
							Reject
						</Button>

						<Button
							size="md"
							style={{ marginRight: '8px' }}
							disabled={loading}
							onClick={() => {
								getData({ status: 'APPROVED' });
							}}
						>
							Approve
						</Button>
					</div>
				</Modal.Footer>
			)}
		</Modal>
	);
}

export default SecurityDepositCommonModal;
