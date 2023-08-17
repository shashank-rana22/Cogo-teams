import { Button, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import ReviewModal from './ReviewModal';
import styles from './styles.module.css';

function ApprovalActions({
	item = {}, task = {}, uploadedDocs = [], uploadedDocsRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);

	const uploadedDocData = uploadedDocs?.filter((doc) => doc?.id === item?.id)?.[GLOBAL_CONSTANTS.zeroth_index];

	const handleActions = () => {
		if (uploadedDocData?.state === 'document_amendment_requested') {
			return (
				<div className={styles.action_div}>
					<Tooltip
						theme="light"
						placement="bottom"
						interactive
						content={uploadedDocData?.remarks?.[GLOBAL_CONSTANTS.zeroth_index]}
					>
						<div className={styles.remarks}>View Remark</div>
					</Tooltip>

					<div className={cl`${styles.text} ${styles.reject}`}>Rejected</div>

					<Button
						themeType="secondary"
						style={{ padding: '2px 8px', borderRadius: '6px', marginLeft: '16px' }}
						onClick={() => setOpen(true)}
					>
						Review
					</Button>
				</div>
			);
		}

		if (uploadedDocData?.state === 'document_accepted') {
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
