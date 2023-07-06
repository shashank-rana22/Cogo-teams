import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import UploadDoc from '../UploadDoc';

import styles from './styles.module.css';

const DELETE_ICON_DIM = 20;

function Actions({
	item = {}, task = {}, uploadedDocs = {}, uploadedDocsRefetch = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [updateOpen, setUpdateOpen] = useState(false);

	return (
		<div>
			{!isEmpty(uploadedDocs) ? (
				<div className={styles.actions_wrap}>
					<a
						href={uploadedDocs?.document_url}
						target="_blank"
						className={styles.uploaded_doc}
						rel="noreferrer"
					>
						View Uploaded Document
					</a>

					<div className={styles.uploaded}>Uploaded</div>

					{uploadedDocs?.state !== 'document_accepted' ? (
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
					existingDoc={uploadedDocs}
				/>
			) : null}
		</div>
	);
}

export default Actions;
