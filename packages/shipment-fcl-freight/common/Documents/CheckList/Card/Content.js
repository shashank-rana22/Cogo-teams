import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import VerticleLine from '../VerticleLine';

import ReviewSiDocument from './ReviewSiDocument';
import styles from './styles.module.css';

const INCREMENT_BY_ONE = 1;
const LABEL_SPLIT_LOWER_INDEX = -1;
const STARTING_POINT = 1;

const SUPPLIER_STAKEHOLDERS = [
	'booking_desk',
	'booking_desk_manager',
	'superadmin',
];

function Content({
	uploadedItem = {},
	idx = 0,
	taskList = [],
	isChecked = false,
	item = {},
	shipment_data = {},
	handleSave = () => {},
	handleView = () => {},
	primary_service = {},
	receivedViaEmail = false,
	showUploadText = '',
	setShowDoc = () => {},
	setShowApproved = () => {},
	docType = '',
	shipmentDocumentRefetch = () => {},
	activeStakeholder = '',
}) {
	const [siReviewState, setSiReviewState] = useState(false);

	const isBlReleased = [
		'approved',
		'released',
		'surrendered',
		'delivered',
	].includes(uploadedItem?.bl_detail_status);

	const tradeType = primary_service?.trade_type;

	const { document_type, state } = uploadedItem;

	const getUploadButton = () => {
		if (showUploadText.length) {
			return (
				<Button
					themeType="link"
					className="primary md text"
					onClick={() => (
						receivedViaEmail
							? setShowApproved({
								...item,
								document_type   : docType,
								document_url    : uploadedItem?.file_url,
								mail_id         : uploadedItem?.id,
								organization_id : shipment_data?.importer_exporter_id,
								type            : 'task',
							})
							: setShowDoc({
								...item,
								document_type: docType,
							}))}
				>
					{receivedViaEmail ? 'Approve Document' : showUploadText}
				</Button>
			);
		}
		return null;
	};

	const SI_REVIEW_CONDITION =	document_type === 'si' && state === 'document_accepted';

	return (
		<div className={styles.single_item}>
			<VerticleLine
				checked={isChecked}
				isLast={taskList.length === idx + INCREMENT_BY_ONE}
			/>
			<div className={isChecked ? styles.single_item_child : styles.upload_item}>

				<div className={styles.main}>
					<div className={styles.heading}>
						{item?.label?.split('Upload')?.slice(LABEL_SPLIT_LOWER_INDEX)[GLOBAL_CONSTANTS.zeroth_index]}
					</div>
					{isChecked ? (
						<div className={styles.gap}>
							<div className={styles.upload_info}>
								Uploaded By:
								{' '}
								{ uploadedItem?.uploaded_by_user?.name
									|| uploadedItem?.uploaded_by_org?.business_name}

							</div>
							<div className={styles.upload_info}>
								Uploaded On:
								{' '}
								{formatDate({
									date       : uploadedItem?.uploaded_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'dateTime',
								})}
							</div>
							<div className={cl`${styles.document_status}
							 ${['document_amendment_requested', 'document_rejected'].includes(uploadedItem?.state)
								? styles.pending : styles.accepted}`}
							>
								{startCase(uploadedItem?.state?.split('_')?.[STARTING_POINT])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem ? (
								<div className={styles.upload_info}>
									Due On:
									{' '}
									{formatDate({
										date       : item?.pendingItem?.deadline,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
									})}
								</div>
							) : null}

							{receivedViaEmail && (
								<div className={styles.message_text}>
									<IcCError width={14} height={14} />
									Document recieved - Please confirm
								</div>
							)}

						</div>
					)}
				</div>

				{SI_REVIEW_CONDITION && SUPPLIER_STAKEHOLDERS.includes(activeStakeholder) ? (
					<Button
						themeType="link"
						onClick={() => setSiReviewState(true)}
					>
						Reject
					</Button>
				) : null}

				{isChecked ? (
					<div className={styles.action_container}>
						{(!(
							[
								'house_bill_of_lading',
								'bill_of_lading',
							].includes(uploadedItem?.document_type) && tradeType === 'export'
						)
						|| isBlReleased)
							? (
								<>
									<Button
										themeType="link"
										onClick={() => handleView(uploadedItem?.document_url)}
									>
										View
									</Button>
									<Button
										themeType="link"
										onClick={() => handleSave(uploadedItem?.document_url)}
									>
										Download
									</Button>
								</>
							) : null}

					</div>
				) : getUploadButton()}

			</div>

			{siReviewState ? (
				<ReviewSiDocument
					siReviewState={siReviewState}
					setSiReviewState={setSiReviewState}
					uploadedItem={uploadedItem}
					shipmentDocumentRefetch={shipmentDocumentRefetch}
				/>
			) : null}

		</div>
	);
}
export default Content;
