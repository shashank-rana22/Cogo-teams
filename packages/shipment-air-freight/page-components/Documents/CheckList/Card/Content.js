import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

const TASK_INDEX_SLICE_FOR_DOC_TYPE = -1;
const INCREMENT_BY_ONE = 1;
const STATE_NAME_INDEX = 1;

function Content({
	uploadedItem,
	idx,
	taskList,
	isChecked,
	item,
	shipment_data,
	handleSave,
	handleView,
	primary_service,
	receivedViaEmail,
	showUploadText,
	setShowDoc,
	setShowApproved,
	docType,
}) {
	const isBlReleased = ['approved', 'released', 'surrendered', 'delivered'].includes(uploadedItem?.bl_detail_status);

	const tradeType = primary_service?.trade_type;

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

	return (
		<div className={styles.single_item}>
			<VerticleLine
				checked={isChecked}
				isLast={taskList.length === idx + INCREMENT_BY_ONE}
			/>
			<div className={isChecked ? styles.single_item_child : styles.upload_item}>

				<div className={styles.main}>
					<div className={styles.heading}>
						{
						item?.label.split('Upload').slice(TASK_INDEX_SLICE_FOR_DOC_TYPE)[GLOBAL_CONSTANTS.zeroth_index]
						}
					</div>
					{isChecked ? (
						<div className={styles.gap}>
							<div className={styles.upload_info}>
								Uploaded By:&nbsp;
								{ uploadedItem?.uploaded_by_user?.name
									|| uploadedItem?.uploaded_by_org?.business_name}

							</div>

							<div className={styles.upload_info}>
								Uploaded On:&nbsp;
								{format(uploadedItem?.created_at, 'dd MMM yyyy')}

							</div>

							<div className={cl`${styles.document_status}
							 ${['document_amendment_requested', 'document_rejected'].includes(uploadedItem?.state)
								? styles.pending : styles.accepted}`}
							>
								{startCase(uploadedItem?.state?.split('_')?.[STATE_NAME_INDEX])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem ? (
								<div className={styles.upload_info}>
									Due On:&nbsp;
									{format(item?.pendingItem?.deadline, 'dd MMM yyyy')}
								</div>
							) : null}

							{receivedViaEmail ? (
								<div className={styles.message_text}>
									<IcCError width={14} height={14} />
									Document recieved - Please confirm
								</div>
							) : null}

						</div>
					)}
				</div>

				{isChecked ? (
					<div className={styles.action_container}>
						{(!(['house_bill_of_lading', 'bill_of_lading']
							.includes(uploadedItem?.document_type) && tradeType === 'export') || isBlReleased)
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
