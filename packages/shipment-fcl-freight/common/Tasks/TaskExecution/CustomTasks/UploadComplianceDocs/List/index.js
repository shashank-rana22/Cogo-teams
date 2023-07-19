import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import Actions from '../Actions';
import ApprovalActions from '../ApprovalActions';
import DocumentInfo from '../DocumentInfo';

import styles from './styles.module.css';

function List({
	item = {}, task = {}, uploadedDocsRefetch = () => {}, allUploadedDocs = [],
}) {
	const uploadedDocs = allUploadedDocs?.filter((doc) => [item?.docName, item?.file_name].includes(doc?.file_name));

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.doc_info}>
					<DocumentInfo item={item} />
				</div>

				{item?.docLink || item?.sample_doc ? (
					<a
						href={item?.docLink || item?.sample_doc}
						target="_blank"
						className={styles.sample_file}
						rel="noreferrer"
					>
						Download Sample File
					</a>
				) : null}

				{task.task === 'approve_compliance_documents'
				&& uploadedDocs?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url ? (
					<a
						href={uploadedDocs?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url}
						target="_blank"
						className={styles.sample_file}
						rel="noreferrer"
					>
						View Document
					</a>
					) : null}
			</div>

			{task.task === 'approve_compliance_documents' ? (
				<div className={styles.approval_actions}>
					<ApprovalActions
						item={item}
						task={task}
						uploadedDocsRefetch={uploadedDocsRefetch}
						uploadedDocs={allUploadedDocs}
					/>
				</div>
			) : (
				<div className={styles.actions}>
					<Actions
						item={item}
						task={task}
						uploadedDocsRefetch={uploadedDocsRefetch}
						allDocs={allUploadedDocs}
					/>
				</div>
			)}
		</div>
	);
}

export default List;