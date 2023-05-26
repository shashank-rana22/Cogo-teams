import { Button, Modal } from '@cogoport/components';
import { TradeDocTemplate } from '@cogoport/ocean-modules';
import { forwardRef, useRef, useState } from 'react';

import Form from './Form/index.js';
import styles from './styles.module.css';

function HBLCreate({
	onSave = () => {},
	hblData = {},
	shipmentHblDoc = {},
	isHBLUploaded = false,
	handleUploadHBL = () => {},
	hblUploadData = {},
}) {
	const [show, setShow] = useState(false);

	const ref = useRef();
	const templateInitialValues = { ...hblData };
	const handleSave = () => {
		ref.current.submit().then(onSave);
		setShow(false);
	};

	const headerAction = () => (
		<header className={styles.header_action}>
			<p>Trade Document Template</p>
			<div>
				<Button themeType="secondary" onClick={() => setShow(false)}>Close</Button>
				<Button onClick={handleSave}>Save</Button>
			</div>
		</header>

	);

	return (
		<div className={styles.container}>
			{isHBLUploaded
				? (
					<>
						<div className={styles.container_child}>
							<div>
								Click on the following button to amend the existing HBL
							</div>

							<Button
								onClick={() => setShow(true)}
								size="sm"
								themeType="accent"
							>
								EDIT DRAFT BL
							</Button>
						</div>

						<Modal
							size="fullscreen"
							show={show}
							onClose={() => setShow(false)}
							className={styles.custom_modal}
							showCloseIcon={false}
						>
							<Modal.Header title={headerAction()} />
							<Modal.Body>
								<TradeDocTemplate
									documentType="bluetide_hbl"
									mode="write"
									initialValues={templateInitialValues}
								/>
							</Modal.Body>
						</Modal>
					</>
				) : (
					<>
						<Button
							size="sm"
							onClick={() => {
								window.open(
									hblUploadData
										? hblUploadData?.url?.url
										: shipmentHblDoc?.document_url,
									'_blank',
								);
							}}
						>
							View Document
						</Button>

						{!hblUploadData ? (
							<Form
								shipmentHblDoc={shipmentHblDoc}
								handleUploadHBL={handleUploadHBL}
							/>
						) : null}
					</>
				)}
		</div>
	);
}

export default forwardRef(HBLCreate);
