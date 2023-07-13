import { Button, Modal, CheckboxGroup } from '@cogoport/components';

import styles from './styles.module.css';

function PreviewEmail({
	emailData = {},
	show = false,
	loading = false,
	onCloseModal = () => {},
	onConfirm = () => {},
	data = {},
	setCheckboxValue = () => {},
	checkboxValue = [],
}) {
	console.log(data, 'data');
	const options = [
		{ name: 'R1', value: 'R1', label: 'checkbox1' }, { name: 'R2', value: 'R2', label: 'checkbox2' },
		{ name: 'R3', value: 'R3', label: 'checkbox3' }, { name: 'R4', value: 'R4', label: 'checkbox4' },
	];

	return (

		<Modal
			size="lg"
			show={show}
			onClose={() => onCloseModal(false)}
			style={{ height: '700px' }}
		>
			<Modal.Header title={emailData?.subject} />
			<div className={styles.modal_body}>
				<Modal.Body style={{ maxHeight: '570px' }}>
					<CheckboxGroup value={checkboxValue} onChange={setCheckboxValue} options={options} />

					<div>
						<div dangerouslySetInnerHTML={{ __html: emailData?.template }} />
					</div>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						className="secondary md"
						disabled={loading}
						onClick={() => onCloseModal(false)}
					>
						Cancel
					</Button>
				</div>
				<Button
					className="primary md"
					disabled={loading}
					onClick={() => onConfirm(false)}
				>
					Send Mail
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default PreviewEmail;
