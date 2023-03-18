import { Button, Popover } from '@cogoport/components';
import { IcMOverflowDot, IcCError } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import optionsList from '../../helpers/optionsList';
import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

function Content({
	data,
	isChecked,
	idx,
	content,
	setShowHbl,
	setUpdateFreightCertificate,
	setShowConfirmed,
	setShow,
	shipment_data,
	item,
	extraItem,
	receivedViaEmail,
	docType,
	containsFreightCertificate,
	handleView,
	handleSave,
	showUploadButton,
	primary_service,
}) {
	const isBlReleased = [
		'approved',
		'released',
		'surrendered',
		'delivered',
	].includes(extraItem?.bl_detail_status);

	const tradeType = primary_service?.trade_type;

	return (
		<div className={styles.single_item} style={{ padding: '4px 16px 6px' }}>
			<div className={styles.single_item_child}>
				<VerticleLine
					checked={isChecked}
					zIndex={idx}
					isLast={data.length === idx + 1}
				/>
				<div className={styles.main}>
					<div className={styles.heading}>{item?.label.split('Upload').slice(-1)[0]}</div>
					{isChecked ? (
						<div className={styles.gap}>
							<div className={styles.upload_info}>
								Uploaded By
								{' - '}
								{extraItem?.uploaded_by_user?.name
									|| extraItem?.uploaded_by_org?.business_name}
							</div>
							<div className={styles.upload_info}>
								Uploaded on
								{' - '}
								{format(extraItem?.created_at, 'dd MMM yyyy')}

							</div>
							<div className={styles.upload_info}>
								{/* {item?.status ? ` Status - ${startCase(item?.status)}` : null} */}
								Document Status -
								{' '}
								{startCase(extraItem?.state?.split('_')?.[1])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem ? (
								<div className={styles.styled_text}>
									Due on
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

			</div>
			{isChecked ? (
				<div className={styles.action_container}>
					{/* {printableDocs.includes(docType) && (
						<Button
							onClick={() => setShowHbl(extraItem)}
							themeType='secondary'
						>
							Print
						</Button>
					)} */}

					{containsFreightCertificate && docType === 'freight_certificate' && (
						<Button
							onClick={() => setUpdateFreightCertificate(true)}
							themeType="secondary"
							disabled={extraItem?.state === 'document_rejected'}
						>
							Update
						</Button>
					)}

					{(!(
						[
							'draft_bill_of_lading',
							'house_bill_of_lading',
							'bill_of_lading',
						].includes(extraItem?.document_type) && tradeType === 'export'
					)
						|| isBlReleased)
						? (
							<>
								<Button
									themeType="secondary"
									onClick={() => handleView(extraItem?.document_url)}
								>
									View
								</Button>
								<Button
									themeType="secondary"
									onClick={() => handleSave(extraItem?.document_url)}
								>
									Download
								</Button>
							</>
						) : null}

					<Popover
						interactive
						placement="bottom-end"
						theme="light"
						content={content({
							...extraItem,
							docType,
						})}
					>
						<div className={styles.dots} style={{ top: '1.2rem', right: '1rem' }}>
							{!item?.extra
							&& optionsList.organization_documents.includes(docType) ? (
								<IcMOverflowDot fontSize="1.1rem" />
								) : null}
						</div>
					</Popover>
				</div>
			) : null }

			{ !isChecked && (receivedViaEmail || showUploadButton)
				? (
					<div style={{ marginRight: '16px' }}>
						<Button
							themeType="secondary"
							onClick={() => (receivedViaEmail
								? setShowConfirmed({
									...item,
									document_type : docType,
									document_url  : extraItem?.file_url,
									mail_id       : extraItem?.id,
									type          : 'task',
								})
								: setShow({
									...item,
									document_type: docType,
								}))}
						>
							{receivedViaEmail ? 'Approve Document' : showUploadButton}
						</Button>
					</div>
				) : null}
		</div>
	);
}
export default Content;
