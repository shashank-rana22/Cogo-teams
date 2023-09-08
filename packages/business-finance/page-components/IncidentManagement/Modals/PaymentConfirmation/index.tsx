import { Textarea, Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['incidentManagement']);
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});

	const { onAction, loading } = usePaymentConfirm({
		refetch,
		setShowModal,
		id,
		t,
	});

	const details = getDetails(paymentConfirmationRequest, organization, t);
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
					<Modal.Header title={t('incidentManagement:payment_confirmation_approval')} />
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
								<div className={styles.input_titles}>{`${t('incidentManagement:remarks')}*`}</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="sm"
									placeholder={t('incidentManagement:remarks_placeholder') || ''}
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
									{t('incidentManagement:reject_btn')}
								</Button>
								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										onAction({ inputValues, status: 'APPROVED' });
									}}
								>
									{t('incidentManagement:approve_btn')}
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
