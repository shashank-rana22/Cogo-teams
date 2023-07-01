import { Button, cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCError, IcMSort } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import VerticleLine from '../VerticleLine';

import CheckAWBDoStatus from './CheckAWBDoStatus';
import styles from './styles.module.css';

const TASK_INDEX_SLICE_FOR_DOC_TYPE = -1;
const INCREMENT_BY_ONE = 1;
const STATE_NAME_INDEX = 1;
const DOCUMENT_PENDING_STATES = ['document_amendment_requested', 'document_rejected'];

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
	setUpdateAirwayBill,
}) {
	const {
		stakeholderConfig:{ documents = {} } = {},
	} = 	useContext(ShipmentDetailContext);

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
								{`Uploaded By ${uploadedItem?.uploaded_by_user?.name
									|| uploadedItem?.uploaded_by_org?.business_name}`}
							</div>

							<div className={styles.upload_info}>
								{`Uploaded On ${formatDate({
									date       : uploadedItem?.created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}`}
							</div>

							<div className={cl`${styles.document_status}
							 ${DOCUMENT_PENDING_STATES.includes(uploadedItem?.state)
								? styles.pending : styles.accepted}`}
							>
								{startCase(uploadedItem?.state?.split('_')?.[STATE_NAME_INDEX])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem && (
								<div className={styles.upload_info}>
									{`Due On: ${formatDate({
										date       : item?.pendingItem?.deadline,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}`}
								</div>
							)}

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
						<CheckAWBDoStatus
							docType={docType}
							item={item}
							uploadedItem={uploadedItem}
							handleView={handleView}
							handleSave={handleSave}
						/>

						{docType === 'airway_bill'
						&& uploadedItem?.state === 'document_accepted'
						&& documents?.allow_update && (
							<div className={styles.tooltip_container}>
								<Button
									themeType="link"
									onClick={() => setUpdateAirwayBill(uploadedItem)}
								>
									<Tooltip
										content="Download"
										placement="top"
										interactive
									>
										<IcMSort />
									</Tooltip>

								</Button>
							</div>
						)}
					</div>
				) : getUploadButton()}

			</div>

		</div>
	);
}
export default Content;
