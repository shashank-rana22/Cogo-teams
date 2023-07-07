import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import UploadDoc from '../UploadDoc';

import styles from './styles.module.css';

const DELETE_ICON_DIM = 20;
const FIRST_DOC = 0;

function Actions({
	item = {}, task = {}, allDocs = [], uploadedDocsRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);

	const docData = allDocs?.filter((doc) => doc?.file_name === item?.docName)?.[FIRST_DOC];
	console.log(docData, 'docData');
	console.log(allDocs, 'allDocs');
	console.log(item, 'item');

	return (
		<div>
			{!isEmpty(docData) ? (
				<div className={styles.actions_wrap}>
					<a
						href={docData?.document_url}
						target="_blank"
						className={styles.uploaded_doc}
						rel="noreferrer"
					>
						View Uploaded Document
					</a>

					<div className={styles.uploaded}>Uploaded</div>

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
			) : null}

			{['document_uploaded', 'document_request'].includes(docData?.state) && isEmpty(docData) ? (
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
			) : null}

			{open ? (
				<UploadDoc
					item={item}
					open={open}
					setOpen={setOpen}
					task={task}
					uploadedDocsRefetch={uploadedDocsRefetch}
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
					existingDoc={allDocs}
				/>
			) : null}
		</div>
	);
}

export default Actions;
