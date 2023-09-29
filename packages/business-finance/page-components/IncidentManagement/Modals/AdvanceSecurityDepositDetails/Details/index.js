import { Button, cl, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetSecurityDepositData from '../../../apisModal/useGetSecurityDeposit';
import RejectModal from '../../../common/RejectModal/index';
import SHIPMENT_MAPPING from '../../../Constants/SHIPMENT_MAPPING';
import STATUS_MAPPING from '../../../Constants/status_mapping';
import { getFormatAmount } from '../../../utils/getformatamount';

import styles from './styles.module.css';

function openLink({ event, partnerId, id, incidentType }) {
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
	const [showRejectModal, setShowRejectModal] = useState(false);

	const { status = '', data = {}, id = '', data: { advanceSecurityDeposit = {}, organization = {} } } = row || {};
	const {
		shipmentId = '',
		shipmentType = '',
		supplierName = '',
		totalAmountToBePaid = 0,
		paymentMode = '',
		amountPerContainer = 0,
		numberOfContainers = 0,
		currency = '',
		shipmentNumber = '',
	} = advanceSecurityDeposit || {};
	const { tradePartyName = '', businessName = '' } = organization || {};
	const { getData, loading } = useGetSecurityDepositData({
		data,
		refetch,
		setDetailsModal,
		id,
		remarkValue,
		t,
	});

	return (
		<div className={styles.container}>
			<div className={styles.details_box}>
				<div className={styles.display_box}>
					<div className={styles.company_div}>
						<div className={styles.heading}>Company Name</div>
						<div className={styles.text}>
							<div className={styles.tooltip_title}>
								{(businessName || tradePartyName || '-')}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.line} />
				<div className={styles.flex_container}>
					<div className={styles.supplier_div}>
						<div className={styles.heading}>Supplier Name</div>
						<div className={styles.text}>{supplierName || '-'}</div>
					</div>
					<div className={styles.shipment_container}>
						<div className={styles.heading}>Shipment Id</div>
						<div className={styles.shipment_id}>
							#
							<a
								href={shipmentId}
								onClick={(event) => {
									openLink({
										event,
										partnerId    : partner_id,
										id           : shipmentNumber,
										incidentType : SHIPMENT_MAPPING[shipmentType.toUpperCase()],
									});
								}}
							>
								{shipmentId || '-'}
							</a>
						</div>
					</div>
					<div className={styles.per_container_div}>
						<div className={styles.heading}>Amount Per Container</div>
						<div className={styles.text}>
							{getFormatAmount(amountPerContainer, currency)}
						</div>
					</div>
					<div className={styles.count_div}>
						<div className={styles.heading}>Container Count</div>
						<div className={styles.text}>{numberOfContainers || '-'}</div>
					</div>
					<div className={styles.amount_div}>
						<div className={styles.heading}>Total Amount</div>
						<div className={styles.text}>
							{getFormatAmount(totalAmountToBePaid, currency)}
						</div>
					</div>
					<div className={styles.payment_div}>
						<div className={styles.heading}>Payment Mode</div>
						<div className={styles.text}>{paymentMode || '-'}</div>
					</div>
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
						onChange={(value) => setRemarkValue(value)}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							disabled={isEmpty(remarkValue) || loading}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
						>
							Reject
						</Button>

						<Button
							size="md"
							themeType="primary"
							disabled={isEmpty(remarkValue) || loading}
							loading={loading}
							onClick={() => { getData({ status: STATUS_MAPPING?.approved } || ''); }}
						>
							Approve
						</Button>
					</div>
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={getData}
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
