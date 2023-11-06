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
import openLink from '../../../utils/openShipmentLink';

import styles from './styles.module.css';

const getFormatDate = (newdate) => {
	const [date, time] = newdate?.split(' ') || [];
	const [day, month, year] = date.split('-');
	const reversedDate = `${month}-${day}-${year} ${time}`;

	return formatDate(
		{ date: reversedDate, dateformat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], formatType: 'date' },
	);
};

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

	const { concorPdaApprovalRequest = {} } = data || {};
	const {
		sid = '', totalBuyPrice = '', placeOfDestination = '', placeOfSupply = '',
		isTaxApplicable = true, documentDate = '', dueDate = '', beneficiaryName = '', currency = '',
		shipmentType = '', entity = '', registrationNo = '', accountNumber = '', bankName = '', ifscCode = '',
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
					<div className={styles.wrapper}>
						<div>
							{(beneficiaryName || '-')}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />
			<div className={styles.heading}>

				PDA Approval
			</div>
			<div className={styles.invoice_flex}>
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
									incidentType : SHIPMENT_MAPPING[shipmentType.toUpperCase()],
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
				<div className={styles.large}>
					<div className={styles.title}>Entity Code</div>
					<div className={styles.text}>
						{entity || '-'}
					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Registration Number</div>
					<div className={styles.text}>
						{registrationNo || '-'}
					</div>
				</div>
			</div>
			<div className={styles.header_row}>
				<div className={styles.heading}>Invoice Details</div>
				<div className={styles.tag}>Type: Advance</div>
			</div>
			<div className={styles.invoice_flex}>
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
					<div className={styles.text}>{isTaxApplicable ? 'Yes' : 'N/A'}</div>
				</div>
				<div className={styles.large}>
					<div className={styles.title}>Document Date</div>
					<div className={styles.text}>
						{getFormatDate(documentDate) }
					</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>Due Date</div>
					<div className={styles.text}>
						{getFormatDate(dueDate)}

					</div>
				</div>
			</div>

			<div className={styles.header_row}>
				<div className={styles.heading}>Bank Details</div>
			</div>

			<div className={styles.invoice_flex}>
				<div className={styles.large}>
					<div className={styles.title}>Bank Name</div>
					<div className={styles.text}>{bankName || '-'}</div>
				</div>
				<div className={styles.medium}>
					<div className={styles.title}>IFSC Code</div>
					<div className={styles.text}>{ifscCode || '-'}</div>
				</div>
				<div className={styles.small}>
					<div className={styles.title}>Account Number</div>
					<div className={styles.text}>{accountNumber || '-'}</div>
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
							onClick={() => { onAction({ status: STATUS_MAPPING.approved }); }}
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
