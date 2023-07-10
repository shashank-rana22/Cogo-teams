import Actions from '../Actions';
import ApprovalActions from '../ApprovalActions';
import DocumentInfo from '../DocumentInfo';

import styles from './styles.module.css';

const FIRST_DOC = 0;

function List({
	item = {}, task = {}, uploadedDocsRefetch = () => {}, allUploadedDocs = [],
}) {
	const uploadedDocs = allUploadedDocs?.filter((doc) => doc?.file_name === item?.docName);

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.doc_info}>
					<DocumentInfo item={item} />
				</div>

				{item?.docLink ? (
					<a
						href={item?.docLink}
						target="_blank"
						className={styles.sample_file}
						rel="noreferrer"
					>
						Download Sample File
					</a>
				) : null}

				{task.task === 'approve_compliance_documents' && uploadedDocs?.[FIRST_DOC]?.document_url ? (
					<a
						href={uploadedDocs?.[FIRST_DOC]?.document_url}
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
			)
				: (
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
