import { Tooltip } from '@cogoport/components';
import { IcMAppDocumentUpload, IcMInfo } from '@cogoport/icons-react';

import Actions from '../Actions';
import ApprovalActions from '../ApprovalActions';

import styles from './styles.module.css';

const INFO_ICON_DIM = 16;
const UPLOAD_ICON_DIM = 24;
const TOOLTIP_WIDTH = 1000;
const FIRST_DOC = 0;

function List({
	item = {}, task = {}, uploadedDocs = [], uploadedDocsRefetch = () => {}, allUploadedDocs = [],
}) {
	const IS_UPLOADED = uploadedDocs?.filter((doc) => doc?.file_name === item?.docName);

	return (
		<div className={styles.container}>
			<IcMAppDocumentUpload height={UPLOAD_ICON_DIM} weight={UPLOAD_ICON_DIM} />

			<div className={styles.doc_name_div}>
				<div className={styles.doc_label}>Document Name</div>

				<div className={styles.doc_name_info}>
					<div className={styles.doc_name}>{item?.docName}</div>

					<Tooltip
						theme="light"
						placement="bottom"
						interactive
						maxWidth={TOOLTIP_WIDTH}
						content={<div className={styles.tooltip_content}>{item?.docExpNotes}</div>}
					>
						<IcMInfo height={INFO_ICON_DIM} width={INFO_ICON_DIM} className={styles.info_icon} />
					</Tooltip>
				</div>
			</div>

			<a
				href={item?.docLink}
				target="_blank"
				className={styles.sample_file}
				rel="noreferrer"
			>
				Download Sample File
			</a>

			{task.task === 'approve_compliance_documents' ? (
				<a
					href={IS_UPLOADED?.[FIRST_DOC]?.document_url}
					target="_blank"
					className={styles.sample_file}
					rel="noreferrer"
				>
					View Document
				</a>
			) : null}

			{task.task === 'approve_compliance_documents' ? (
				<div className={styles.approval_actions}>
					<ApprovalActions
						item={item}
						task={task}
						uploadedDocsRefetch={uploadedDocsRefetch}
						uploadedDocs={allUploadedDocs}
					/>
				</div>
			)
				: (
					<div className={styles.actions}>
						<Actions
							item={item}
							task={task}
							uploadedDocsRefetch={uploadedDocsRefetch}
							uploadedDocs={IS_UPLOADED?.[FIRST_DOC]}
						/>
					</div>
				)}

		</div>
	);
}

export default List;
