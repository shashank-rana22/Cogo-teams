import { Textarea, Modal, Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import usePaymentConfirm from '../../apisModal/usePaymentConfirm';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

interface PaymentConfirmationInterface {
	requestSubType?: string,
	currency?: string,
	utr?: string,
	paymentAmount?: number,
	documentUrls?: string[],
}

interface Org {
	businessName?:string,
	tradePartyType?:string,
	tradePartyName?:string,
}

interface Props {
	paymentConfirmationRequest?: PaymentConfirmationInterface,
	id?: string,
	refetch?:()=>void,
	organization?:Org,
	isEditable?:boolean,
	remark?:string,
	row:any,
}

function PaymentConfirmation({
	paymentConfirmationRequest, organization,
	id, refetch = () => {}, isEditable = true, remark, row,
}:Props) {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});

	const {
		currency = '', utr, paymentAmount = '',
		documentUrls, requestSubType,
	} = paymentConfirmationRequest || {};
	const { businessName:organizationName, tradePartyType = '', tradePartyName = '' } = organization || {};

	const { useOnAction:OnAction, loading } = usePaymentConfirm({
		refetch,
		setShowModal,
		id,
	});

	const details = [
		{ title: 'Organization Name', value: <div>{organizationName || ''}</div> },
		{ title: 'Trade Party Type', value: <div>{tradePartyType?.replaceAll('_', ' ') || ''}</div> },
		{ title: 'Business Name', value: <div>{tradePartyName || ''}</div> },
		{ title: 'Payment Amount', value: <div>{getFormattedPrice(paymentAmount, currency)}</div> },
		{ title: 'UTR', value: <div>{utr || ''}</div> },
		{ title: 'Request Sub Type', value: <div>{startCase(requestSubType) || ''}</div> },
		{
			title : 'Documents',
			value : (
				<div>
					{(documentUrls || []).map((item) => (
						<div key={item} className={styles.doc}>
							<a
								target="_blank"
								href={item}
								className={styles.file_link}
								rel="noreferrer"
							>
								View Document
							</a>
							<div className={styles.eye}><IcMEyeopen /></div>
						</div>
					))}
				</div>),
		},
	];

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
										OnAction({ inputValues, status: 'REJECTED' });
									}}
								>
									Reject
								</Button>
								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										OnAction({ inputValues, status: 'APPROVED' });
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
