import { Button, cl, Textarea, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetSecurityDepositData from '../../../apisModal/useGetSecurityDeposit';
import SHIPMENT_MAPPING from '../../../Constants/SHIPMENT_MAPPING';
import STATUS_MAPPING from '../../../Constants/status_mapping';
import { getFormatAmount } from '../../../utils/getformatamount';

import styles from './styles.module.css';

function openPDF({ event, partnerId, id, incidentType }) {
	event.preventDefault();
	window.open(`/v2/${partnerId}/booking/${incidentType}/${id}`, '_blank');
}

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { query } = useRouter();
	const { partner_id } = query || {};
	const { t } = useTranslation(['incidentManagement']);
	const [remarkValue, setRemarkValue] = useState('');
	const { status = '', id = '', data: { advanceSecurityDepositRefund = {}, organization = {} } } = row || {};
	const { totalAmount = 0, currency = '' } = advanceSecurityDepositRefund || {};
	const { tradePartyName = '', businessName = '' } = organization || {};
	const { getData, loading } = useGetSecurityDepositData({
		refetch,
		setDetailsModal,
		id,
		remarkValue,
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
			<div className={styles.supplier_div}>
				<div className={styles.heading}>Supplier Name</div>
				<div className={styles.text}>{advanceSecurityDepositRefund?.supplierName || ''}</div>
			</div>
			<div className={styles.shipment_container}>
				<div className={styles.heading}>Shipment Id</div>
				<div className={styles.shipment_id}>
					#
					<a
						href={advanceSecurityDepositRefund?.id}
						onClick={(event) => {
							openPDF({
								event,
								partnerId    : partner_id,
								id           : advanceSecurityDepositRefund?.id,
								incidentType : SHIPMENT_MAPPING[row?.incidentSubtype],
							});
						}}
					>
						{advanceSecurityDepositRefund?.id || ''}
					</a>
				</div>
			</div>
			<div className={styles.amount_div}>
				<div className={styles.heading}>Total Amount</div>
				<div className={styles.text}>
					{getFormatAmount(totalAmount, currency)}
				</div>
			</div>
			<div className={styles.utr_div}>
				<div className={styles.heading}>UTR Number</div>
				<div className={styles.text}>{advanceSecurityDepositRefund?.utrNumber || ''}</div>
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
						onChange={(value) => setRemarkValue(value)}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarkValue) || loading}
							loading={loading}
							onClick={() => getData(STATUS_MAPPING.rejected)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarkValue) || loading}
							loading={loading}
							onClick={() => { getData(STATUS_MAPPING.approved); }}
						>
							Approve
						</Button>
					</div>

				</div>
			) : null }

		</div>
	);
}

export default Details;
