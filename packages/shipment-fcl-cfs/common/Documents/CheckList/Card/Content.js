import { Button, cl } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

function Content({
	uploadedItem,
	idx,
	taskList,
	isChecked,
	item,
	shipment_data,
	handleSave,
	handleView,
	receivedViaEmail,
	showUploadText,
	setShowDoc,
	setShowApproved,
	docType,
}) {
	const state = uploadedItem?.state === 'document_accepted';

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
				isLast={taskList.length === idx + 1}
			/>
			<div className={isChecked ? styles.single_item_child : styles.upload_item}>

				<div className={styles.main}>
					<div className={styles.heading}>{item?.label.split('Upload').slice(-1)[0]}</div>
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
								{startCase(uploadedItem?.state?.split('_')?.[1])}
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
						{state
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
