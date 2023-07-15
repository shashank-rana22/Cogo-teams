import { Button, Modal, CheckboxGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

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
	const pocOptions = (data?.repository_data?.pocs_data || []).map((item) => (
		{
			label : item?.name,
			value : JSON.stringify({
				name  : item?.name,
				email : item?.email,
			}),
		}
	));

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
					<div>Select The Recipient:</div>
					<CheckboxGroup value={checkboxValue} onChange={setCheckboxValue} options={pocOptions} />

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
					disabled={loading || isEmpty(checkboxValue)}
					onClick={() => onConfirm(false)}
				>
					Send Mail
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default PreviewEmail;
