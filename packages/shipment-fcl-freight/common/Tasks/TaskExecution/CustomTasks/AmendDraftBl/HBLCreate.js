import { Button, Modal } from '@cogoport/components';
import { TradeDocTemplate } from '@cogoport/ocean-modules';
import { omit } from '@cogoport/utils';
import { forwardRef, useRef, useState } from 'react';

import Form from './Form/index.js';
import styles from './styles.module.css';

const EXCLUDED_KEYS = ['container_number',
	'marks_and_number', 'package_description', 'gross_weight', 'measurement'];

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
		ref?.current?.submit((data) => {
			const containerDetails = {
				container_number    : data.container_number,
				marks_and_number    : data.marks_and_number,
				package_description : data.package_description,
				gross_weight        : data.gross_weight,
				measurement         : data.measurement,
			};
			data.containers.push(containerDetails);

			const finalData = omit(data, EXCLUDED_KEYS);

			onSave(finalData);
		})();
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
							closeOnOuterClick={false}
						>
							<Modal.Header title={headerAction()} />
							<Modal.Body>
								<TradeDocTemplate
									documentType="bluetide_hbl"
									mode="write"
									initialValues={templateInitialValues}
									ref={ref}
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
