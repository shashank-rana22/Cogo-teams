import { Button, cl, Tooltip } from '@cogoport/components';
import { useState } from 'react';

import ReviewModal from './ReviewModal';
import styles from './styles.module.css';

const FIRST_DOC = 0;

function ApprovalActions({
	item = {}, task = {}, uploadedDocs = [], uploadedDocsRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);

	const uploadedDocData = uploadedDocs?.filter((doc) => doc?.file_name === item?.docName)?.[FIRST_DOC];

	const handleActions = () => {
		if (uploadedDocData?.state === 'document_amendment_requested') {
			return (
				<div className={styles.action_div}>
					<Tooltip
						theme="light"
						placement="bottom"
						interactive
						content={uploadedDocData?.remarks?.[FIRST_DOC]}
					>
						<div className={styles.remarks}>View Remark</div>
					</Tooltip>

					<div className={cl`${styles.text} ${styles.amend}`}>Amendment Requested</div>
				</div>
			);
		} if (uploadedDocData?.state === 'document_rejected') {
			return (
				<div className={styles.action_div}>
					<Tooltip
						theme="light"
						placement="bottom"
						interactive
						content={uploadedDocData?.remarks?.[FIRST_DOC]}
					>
						<div className={styles.remarks}>View Remark</div>
					</Tooltip>

					<div className={cl`${styles.text} ${styles.reject}`}>Rejected</div>
				</div>
			);
		} if (uploadedDocData?.state === 'document_accepted') {
			return <div className={cl`${styles.text} ${styles.approve}`}>Reviewed</div>;
		}
		return (
			<Button
				themeType="secondary"
				style={{ padding: '2px 8px', borderRadius: '6px' }}
				onClick={() => setOpen(true)}
			>
				Review
			</Button>
		);
	};

	if (item?.state === 'document_requested') {
		return null;
	}

	return (
		<div>
			<div className={styles.actions_wrap}>
				{handleActions()}
			</div>

			{open ? (
				<ReviewModal
					open={open}
					setOpen={setOpen}
					item={uploadedDocData}
					uploadedDocsRefetch={uploadedDocsRefetch}
					task={task}
				/>
			) : null}
		</div>
	);
}

export default ApprovalActions;
