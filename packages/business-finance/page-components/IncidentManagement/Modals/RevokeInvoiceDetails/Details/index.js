import { Button, cl, Textarea, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetRevokeInvoiceData from '../../../apisModal/useGetRevokeInvoiceData';
import RejectModal from '../../../common/RejectModal/index';
import STATUS_MAPPING from '../../../Constants/status_mapping';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [remarks, setRemarks] = useState('');
	const [showRejectModal, setShowRejectModal] = useState(false);

	const { status = '', id = '', data: { revokeInvoiceRequest = {}, organization = {} } } = row || {};
	const { tradePartyName = '', businessName = '' } = organization || {};

	const { useOnAction: onAction, loading } = useGetRevokeInvoiceData({
		refetch,
		setDetailsModal,
		id,
		reqRevokeInvoiceRequest: revokeInvoiceRequest,
		remarks,
		t,
	});

	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							<Tooltip
								interactive
								content={(tradePartyName || businessName || '')}
							>
								<div>{(tradePartyName || businessName || '')}</div>
							</Tooltip>
						</div>
					</div>
				</div>
				<div>
					<div className={styles.heading}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || ''}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.invoice}>
				<div className={styles.heading}>Invoice Number</div>
				<div className={styles.text}>{revokeInvoiceRequest?.invoiceNumber || ''}</div>
			</div>
			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
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
							onClick={() => { onAction(STATUS_MAPPING.approved); }}
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
			) : null }

		</div>
	);
}

export default Details;
