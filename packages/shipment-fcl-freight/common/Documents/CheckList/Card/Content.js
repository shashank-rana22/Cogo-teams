import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

const INCREMENT_FACTOR = 1;
const SLICE_INDEX = -1;

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
	showUploadText = false,
	setShowDoc = () => {},
	setShowApproved = () => {},
	docType = '',
	canEditDocuments = true,
}) {
	const isBlReleased = [
		'approved',
		'released',
		'surrendered',
		'delivered',
	].includes(uploadedItem?.bl_detail_status);

	const tradeType = primary_service?.trade_type;

	const getUploadButton = () => {
		if (showUploadText.length && canEditDocuments) {
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

	return (
		<div className={styles.single_item}>
			<VerticleLine
				checked={isChecked}
				isLast={taskList.length === idx + INCREMENT_FACTOR}
			/>
			<div className={isChecked ? styles.single_item_child : styles.upload_item}>

				<div className={styles.main}>
					<div className={styles.heading}>
						{item?.label?.split('Upload').slice(SLICE_INDEX)[GLOBAL_CONSTANTS.zeroth_index]}
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
									date       : uploadedItem?.created_at,
									formatType : 'dateTime',
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
								})}

							</div>
							<div className={cl`${styles.document_status}
							 ${['document_amendment_requested', 'document_rejected'].includes(uploadedItem?.state)
								? styles.pending : styles.accepted}`}
							>
								{startCase(uploadedItem?.state?.split('_')?.[INCREMENT_FACTOR])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem ? (
								<div className={styles.upload_info}>
									Due On:
									{' '}
									{
									formatDate({
										date       : item?.pendingItem?.deadline,
										formatType : 'dateTime',
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
									})
}
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

		</div>
	);
}
export default Content;
