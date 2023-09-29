import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePaymentConfirm from '../../../apisModal/usePaymentsConfirm';
import RejectModal from '../../../common/RejectModal/index';
import STATUS_MAPPING from '../../../Constants/status_mapping';
import { getFormatAmount } from '../../../utils/getformatamount';

import styles from './styles.module.css';

function Details({ row = {}, setDetailsModal = () => {}, refetch = () => {} }) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const { status = '', id = '', data = {} } = row || {};

	const { paymentConfirmationRequest, organization } = data || {};
	const { tradePartyName = '', businessName = '', tradePartyType = '' } = organization || {};

	const {
		utr = '', paymentAmount = '', currency = '',
	} = paymentConfirmationRequest || {};

	const { onAction = () => {}, loading = false } = usePaymentConfirm({
		data,
		refetch,
		setDetailsModal,
		id,
		t,
		remarks,
	});

	const [showRejectModal, setShowRejectModal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Company Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							{(businessName || tradePartyName || '')}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Trade Party Name</div>
					<div className={styles.text}>{tradePartyName || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Trade Party Type</div>
					<div className={styles.text}>{tradePartyType || '-'}</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>UTR</div>
					<div className={styles.text}>{utr || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Payment Amount</div>
					<div className={styles.text}>{getFormatAmount(paymentAmount, currency)}</div>
				</div>
			</div>

			{status === 'REQUESTED' ? (
				<div>
					<div className={styles.remarks_div}>
						<div
							className={cl`${styles.label} 
								${styles.required_field}`}
						>
							Remarks
						</div>

						<Textarea
							className={styles.textarea}
							name="remark"
							size="md"
							placeholder="Enter Remarks Here"
							onChange={(value) => setRemarks(value)}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarks) || loading}
							loading={loading}
							onClick={() => onAction({ status: STATUS_MAPPING.approved })}
						>
							Approve
						</Button>
					</div>
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={onAction}
							showRejectModal={showRejectModal}
							loading={loading}
						/>
					)}
				</div>
			) : null}
		</div>
	);
}

export default Details;
