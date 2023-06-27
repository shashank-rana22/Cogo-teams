import { Textarea, Modal, Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import usePaymentConfirm from '../../apisModal/usePaymentConfirm';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import getDetails from './getDetails';
import styles from './styles.module.css';

interface PaymentConfirmationInterface {
	requestSubType?: string;
	currency?: string;
	utr?: string;
	paymentAmount?: string;
	documentUrls?: string[];
}

interface Org {
	businessName?:string;
	tradePartyType?:string;
	tradePartyName?:string;
}

interface Props {
	paymentConfirmationRequest?: PaymentConfirmationInterface;
	id?: string;
	refetch?:()=>void;
	organization?:Org;
	isEditable?:boolean;
	remark?:string;
	row:RowTypes;
}
interface RowTypes {
	status:string;
}

function PaymentConfirmation({
	paymentConfirmationRequest = {}, organization = {},
	id, refetch = () => {}, isEditable = true, remark, row,
}:Props) {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});

	const { onAction, loading } = usePaymentConfirm({
		refetch,
		setShowModal,
		id,
	});

	const details = getDetails(paymentConfirmationRequest, organization);
	const isDisabled = loading || !inputValues.remarks;

	useEffect(() => {
		if (!showModal) {
			setInputValues({
				remarks: null,
			});
		}
	}, [showModal]);

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title="Payment Confirmation Approval" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}

						{details?.map((detail) => (
							<div key={detail.title} className={styles.flex}>
								<div className={styles.title}>
									{detail.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{detail.value}</div>
								</div>
							</div>
						))	}

						<div>
							<div style={{ display: 'flex' }}>
								<div className={styles.input_titles}>Remarks*</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="sm"
									placeholder="Enter Remarks Here..."
									disabled={!isEditable}
									onChange={(value: string) => setInputValues({ ...inputValues, remarks: value })}
									value={remark}
									className={styles.text_area}
								/>
							</div>
						</div>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									themeType="secondary"
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										onAction({ inputValues, status: 'REJECTED' });
									}}
								>
									Reject
								</Button>
								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										onAction({ inputValues, status: 'APPROVED' });
									}}
								>
									Approve
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default PaymentConfirmation;
