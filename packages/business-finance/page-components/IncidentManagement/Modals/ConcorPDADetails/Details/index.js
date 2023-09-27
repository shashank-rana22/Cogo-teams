import { Button, cl, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useApproveConcor from '../../../apisModal/useApproveConcor';
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

	const [remarks, setRemarks] = useState('');
	const [showRejectModal, setShowRejectModal] = useState(false);

	const { status = '', id = '', data = {} } = row || {};

	const { concorPdaApprovalRequest } = data || {};

	const {
		sid = '', totalBuyPrice = '', placeOfDestination = '', placeOfSupply = '',
		isTaxApplicable = true, documentDate = '', dueDate = '', beneficiaryName = '', currency = '',
	} = concorPdaApprovalRequest || {};

	const { useOnAction: onAction, loading = false } = useApproveConcor({
		refetch,
		setDetailsModal,
		id,
		data,
		t,
		remarks,
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Company Name</div>
					<div className={styles.text}>
						{beneficiaryName || '-'}

					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || '-'}</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.heading}>

				PDA Approval
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Shipment Id</div>
					<div className={styles.link}>
						#
						<a
							href={sid}
							onClick={(event) => {
								openLink({
									event,
									partnerId    : partner_id,
									id           : sid,
									incidentType : SHIPMENT_MAPPING[row?.incidentSubtype], // to be changed
								});
							}}
						>
							{sid || '-'}
						</a>

					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Total Buy Price</div>
					<div className={styles.text}>
						{getFormatAmount(totalBuyPrice, currency)}
					</div>
				</div>
			</div>
			<div className={styles.heading}>

				Invoice Details
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Destination</div>
					<div className={styles.text}>{placeOfDestination || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Supply</div>
					<div className={styles.text}>{placeOfSupply || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Tax Applicable</div>
					<div className={styles.text}>{isTaxApplicable ? 'Yes' : 'No'}</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.large}>
					<div className={styles.title}>Document Date</div>
					<div className={styles.text}>
						{formatDate({
							date       : documentDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) }
					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Due Date</div>
					<div className={styles.text}>
						{formatDate({
							date       : dueDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}) }

					</div>
				</div>
			</div>

			{ status === 'REQUESTED' ? (
				<div>
					<div className={styles.remarks_div}>
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
