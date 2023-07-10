import { Button, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import UploadDoc from '../UploadDoc';

import styles from './styles.module.css';

const DELETE_ICON_DIM = 20;

function Actions({
	item = {}, task = {}, allDocs = [], uploadedDocsRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);

	const docData = allDocs?.filter((doc) => [item?.file_name || item?.docName].includes(doc?.file_name))
		?.[GLOBAL_CONSTANTS.zeroth_index];

	let state = 'uploaded';
	if (docData?.state === 'document_accepted') {
		state = 'approved';
	} else if (docData?.state === 'document_amendment_requested') {
		state = 'Rejected';
	}

	return (
		<div>
			{!isEmpty(docData) && docData?.state !== 'document_requested' ? (
				<div className={styles.actions_wrap}>
					<a
						href={docData?.document_url}
						target="_blank"
						className={styles.uploaded_doc}
						rel="noreferrer"
					>
						View Uploaded Document
					</a>

					{docData?.remarks?.[GLOBAL_CONSTANTS.zeroth_index] ? (
						<Tooltip
							theme="light"
							placement="bottom"
							interactive
							content={docData?.remarks?.[GLOBAL_CONSTANTS.zeroth_index]}
						>
							<div className={styles.remarks}>View Remark</div>
						</Tooltip>
					) : null}

					<div className={cl`${styles.text} ${styles[state]}`}>
						{startCase(state)}
					</div>

					{docData?.state !== 'document_accepted' ? (
						<Button themeType="link" onClick={() => setUpdateOpen(true)}>
							<IcMDelete
								height={DELETE_ICON_DIM}
								width={DELETE_ICON_DIM}
								fill="#EE3425"
							/>
						</Button>
					) : null}
				</div>
			) : (
				<div className={styles.actions_wrap}>
					<div className={styles.not_uploaded}>Yet To Receive</div>

					<Button
						themeType="secondary"
						style={{ padding: '2px 8px', borderRadius: '6px' }}
						onClick={() => setOpen(true)}
					>
						Upload
					</Button>
				</div>
			)}

			{open ? (
				<UploadDoc
					item={item}
					open={open}
					setOpen={setOpen}
					task={task}
					uploadedDocsRefetch={uploadedDocsRefetch}
					existingDoc={docData}
				/>
			) : null}

			{updateOpen ? (
				<UploadDoc
					item={item}
					open={updateOpen}
					setOpen={setUpdateOpen}
					task={task}
					uploadedDocsRefetch={uploadedDocsRefetch}
					type="update"
					existingDoc={docData}
				/>
			) : null}
		</div>
	);
}

export default Actions;
