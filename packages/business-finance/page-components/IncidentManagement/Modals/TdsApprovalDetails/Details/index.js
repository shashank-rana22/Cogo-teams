import { Button, cl, Textarea, Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetTdsData from '../../../apisModal/useGetTdsData';
import RejectModal from '../../../common/RejectModal/index';
import STATUS_MAPPING from '../../../Constants/status_mapping';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const [remark, setRemark] = useState('');
	const [showRejectModal, setShowRejectModal] = useState(false);

	const { status = '', id = '' } = row || {};

	const {
		currentTdsRate,
		requestedTdsRate,
		validFrom = '',
		validTo = '',
		currentTdsStyle = '',
		requestedTdsStyle = '',
	} = row?.data?.tdsRequest || {};
	const { tradePartyName = '', businessName = '' } = row?.data?.organization || {};

	const getRatePercentageData = [
		{ label: t('incidentManagement:current_tds_rate'), value: currentTdsRate },
		{ label: t('incidentManagement:requested_tds_rate'), value: requestedTdsRate },
	];
	const { useOnAction: OnAction, loading } = useGetTdsData({
		refetch,
		setDetailsModal,
		id,
		row,
		remark,
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
			<div className={styles.flex}>
				{getRatePercentageData.map((itemData) => (
					<div className={styles.rates_data} key={itemData?.label}>
						<div className={styles.rates}>
							{itemData?.value ?? '-'}
							%
						</div>
						<div className={styles.label_text}>{itemData?.label || '-'}</div>
					</div>
				))}
			</div>
			<div className={styles.validity}>
				<div className={styles.heading}>Validity</div>
				<div className={styles.text}>
					{validFrom || ''}
					{' '}
					-
					{' '}
					{validTo || ''}
				</div>
			</div>
			<div className={styles.tds_style}>
				<div className={styles.company_div}>
					<div className={styles.heading}>
						Current TDS Style
					</div>
					<div className={styles.text}>{startCase(currentTdsStyle) || ''}</div>
				</div>
				<div>
					<div className={styles.heading}>
						New TDS Style Requested
					</div>
					<div className={styles.requested_tds_text}>{startCase(requestedTdsStyle) || ''}</div>
				</div>
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
						onChange={(value) => setRemark(value)}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remark) || loading}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remark) || loading}
							loading={loading}
							onClick={() => OnAction(STATUS_MAPPING.approved)}
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
