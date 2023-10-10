import { Button, Modal, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCError } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { GenerateFreightCertificate } from '../../../Tasks/TaskExecution/CustomTasks';
import VerticalLine from '../VerticleLine';

import PrintDocument from './PrintDocument';
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

const PRINTABLE_DOCS = ['draft_house_bill_of_lading'];

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
	canEditDocuments = true,
	setShowDoc = () => {},
	setShowApproved = () => {},
	docType = '',
	shipmentDocumentRefetch = () => {},
	activeStakeholder = '',
	bl_details = [],
	do_details = [],
}) {
	const { user_id = '' } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [siReviewState, setSiReviewState] = useState(false);
	const [printDoc, setPrintDoc] = useState(false);
	const [updateFreightCertificate, setUpdateFreightCertificate] = useState(false);

	const { data:bl_data } = uploadedItem || {};

	const tradeType = primary_service?.trade_type;

	const isSeaway = primary_service?.bl_type === 'seaway';

	const isHBLMBL = [
		'house_bill_of_lading',
		'bill_of_lading',
	].includes(uploadedItem?.document_type);

	const isRestrictedExportBlDo = (isHBLMBL && tradeType === 'export' && isSeaway && isEmpty(bl_details));
	const isRestrictedImportBlDo = (uploadedItem?.document_type === 'bill_of_lading' && tradeType === 'import'
	&& isEmpty(do_details) && activeStakeholder !== 'document_control_manager');

	const { document_type, state, document_url = '' } = uploadedItem;

	const isBlDocVisiblityAllowed = document_type === 'bill_of_lading' && isEmpty(document_url);

	function GetUploadButton() {
		if (showUploadText?.length
			&& canEditDocuments && GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id === user_id) {
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
	}

	const SI_REVIEW_CONDITION = document_type === 'si' && state === 'document_accepted';

	return (
		<div className={styles.single_item}>
			<VerticalLine
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
									Document received - Please confirm
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

				{PRINTABLE_DOCS.includes(document_type)
					&& (
						<Button
							themeType="link"
							onClick={() => setPrintDoc(true)}
						>
							Print
						</Button>
					)}

				{(document_type === 'freight_certificate') ? (
					<Button
						themeType="link"
						onClick={() => setUpdateFreightCertificate(true)}
						disabled={uploadedItem?.state === 'document_rejected'}
					>
						Update
					</Button>
				) : null}

				{isChecked ? (
					<div className={styles.action_container}>
						{isRestrictedExportBlDo || isRestrictedImportBlDo
							? null : (

								<>
									<Button
										themeType="link"
										onClick={() => handleView(uploadedItem?.document_url)}
										disabled={isBlDocVisiblityAllowed}
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
							) }

					</div>
				) : <GetUploadButton />}

			</div>

			{siReviewState ? (
				<ReviewSiDocument
					siReviewState={siReviewState}
					setSiReviewState={setSiReviewState}
					uploadedItem={uploadedItem}
					shipmentDocumentRefetch={shipmentDocumentRefetch}
				/>
			) : null}

			{printDoc ? (
				<PrintDocument
					shipment_data={shipment_data}
					primary_service={primary_service}
					data={bl_data}
					show={printDoc}
					setShow={setPrintDoc}
				/>
			) : null}

			{updateFreightCertificate ? (
				<Modal
					size="xl"
					show={updateFreightCertificate}
					onClose={() => setUpdateFreightCertificate(false)}
					closeOnOuterClick={false}
				>
					<Modal.Header title="Update Freight Certificate" />
					<Modal.Body>
						<GenerateFreightCertificate
							task={taskList?.filter((task) => task?.document_type === document_type)}
							refetch={shipmentDocumentRefetch}
							onCancel={() => setUpdateFreightCertificate(false)}
						/>
					</Modal.Body>
				</Modal>
			) : null}

		</div>
	);
}
export default Content;
