import { Button, cl, Textarea, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useSezApproveReject from '../../../apisModal/useSezApproveReject';
import ClipBoard from '../../../common/Clipboard';
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

	const { status = '', id = '', data = {} } = row || {};
	const { sezRequest = {}, organization = {} } = data || {};
	const { tradePartyName = '', businessName = '', tradePartyType } = organization || {};
	const { taxNumber = '', address = '', pincode = '' } = sezRequest || {};

	const { useOnAction: OnAction, loading } = useSezApproveReject({
		remarks,
		refetch,
		setDetailsModal,
		id,
		sezRequest,
		t,
	});
	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Trade Party Name</div>
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							<Tooltip
								interactive
								content={(tradePartyName || '')}
							>
								<div>{(tradePartyName || '')}</div>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.flex_row}>
				<div className={styles.company_gst}>
					<div className={styles.heading}>GST Number</div>
					<div className={styles.text}>{<ClipBoard data={taxNumber} /> || ''}</div>
				</div>
				<div className={styles.company_gst}>
					<div className={styles.heading}>Trade Party Type</div>
					<div className={styles.text}>{tradePartyType.replaceAll('_', ' ') || ''}</div>
				</div>
				<div className={styles.company_gst}>
					<div className={styles.heading}>Business Name</div>
					<div className={styles.text}>{businessName || ''}</div>
				</div>
				<div className={styles.company_gst}>
					<div className={styles.heading}>Pincode</div>
					<div className={styles.text}>{pincode || ''}</div>
				</div>
			</div>
			<div className={styles.company_address}>
				<div className={styles.heading}>Address</div>
				<div className={styles.text}>{address || ''}</div>
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
							onClick={() => { OnAction(STATUS_MAPPING.approved); }}
						>
							Approve
						</Button>
					</div>
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={OnAction}
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
