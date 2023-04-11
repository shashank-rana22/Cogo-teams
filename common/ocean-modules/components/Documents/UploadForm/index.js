import { Button } from '@cogoport/components';
import { IcMPdf } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';
import WalletForm from './WalletForm';

function UploadForm({
	show,
	setShow,
	activeWallet,
	setActiveWallet,
	// refetch,
}) {
	const handleDocClick = (doc) => {
		setShow({
			...show,
			url  : doc.image_url,
			type : 'task',
		});
	};

	let content;
	switch (show?.type) {
		case 'task':
			// content = <Task show={show} setShow={setShow} refetch={refetch} />;
			break;
		case 'wallet':
			content = (
				<WalletForm
					activeWallet={activeWallet}
					setActiveWallet={setActiveWallet}
					show={show}
					handleDocClick={handleDocClick}
				/>
			);

			break;
		default:
			content = (
				<>
					<div className={styles.label}>Choose From Document Wallet</div>
					<div
						role="button"
						tabIndex={0}
						className={styles.Choose_from_wallet}
						onClick={() => setShow({ ...show, type: 'wallet' })}
					>
						<div>
							<IcMPdf fontSize="2rem" />
						</div>
						<div className={styles.label} style={{ fontSize: '12px', fontWeight: '600' }}>
							Choose a document from the wallet
						</div>
					</div>
					{/* <Separator>OR</Separator>
					<StyledButton>
						<Button
							onClick={() => {
								setShow({ ...show, type: 'task' });
							}}
						>
							Manual Upload
						</Button>
					</StyledButton> */}
					<div className={styles.buttons_container}>
						<Button
							className="secondary md"
							onClick={() => {
								setShow(null);
							}}
						>
							Cancel
						</Button>
					</div>
				</>
			);
			break;
	}
	return <div className={styles.upload_wrapper}>{content}</div>;
}
export default UploadForm;
