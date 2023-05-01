import { Button, Modal } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import Task from './Task';
import WalletForm from './WalletForm';

function UploadForm({
	showDoc = {},
	setShowDoc = () => {},
	activeWallet,
	setActiveWallet = () => {},
	refetch,
}) {
	const handleDocClick = (doc) => {
		setShowDoc({
			...(showDoc || {}),
			url  : doc?.image_url,
			type : 'task',
		});
	};

	let content;
	switch (showDoc?.type) {
		case 'task':
			content = <Task showDoc={showDoc} setShowDoc={setShowDoc} refetch={refetch} />;
			break;

		case 'wallet':
			content = (
				<WalletForm
					showWalletDocs={showDoc.type}
					activeWallet={activeWallet}
					setActiveWallet={setActiveWallet}
					showDoc={showDoc}
					handleDocClick={handleDocClick}
				/>
			);

			break;

		default:
			content = (
				<>
					<Modal.Header title="Document Wallet" />
					<div
						role="button"
						tabIndex={0}
						className={styles.Choose_from_wallet}
						onClick={() => setShowDoc({ ...showDoc, type: 'wallet' })}
					>
						<IcMPdf height={30} width={30} />

						<div className={styles.label}>
							Choose a document from the wallet
						</div>
					</div>

					<div className={styles.separator}>OR</div>

					<div className={styles.styled_button}>
						<Button
							onClick={() => {
								setShowDoc({ ...showDoc, type: 'task' });
							}}
						>
							Manual Upload
						</Button>
					</div>

					<div className={styles.buttons_container}>
						<Button
							className="secondary md"
							onClick={() => {
								setShowDoc(null);
							}}
						>
							Cancel
						</Button>
					</div>
				</>
			);
			break;
	}
	return (<div className={styles.upload_wrapper}>{content}</div>);
}
export default UploadForm;
