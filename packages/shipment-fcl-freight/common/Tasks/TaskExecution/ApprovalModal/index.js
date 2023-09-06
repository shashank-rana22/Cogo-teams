import { Button, Modal } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SHOW_VALUE = [
	'text', 'textarea', 'number', 'pills',
];

function ApprovalModal({
	approvalChanges = {},
	showModal = false,
	loading = false,
	handleApprove = () => {},
	setShowModal = () => {},
}) {
	return (
		<Modal
			show={showModal}
			size="md"
			placement="center"
			onClose={() => setShowModal(false)}
			className={styles.modal_container}
		>
			<Modal.Header title="Confirmation" />
			<Modal.Body>
				Are you sure you want to proceed with the changes in:

				{(Object.entries(approvalChanges) || []).map(([key, value]) => (
					<ul key={key}>
						<li>{value?.label || startCase(key)}</li>

						{SHOW_VALUE.includes(value?.type) ? (
							<div className={styles.values}>

								<span className={styles.old}>{value?.old}</span>

								{!isEmpty(value?.old) && <IcMArrowNext />}

								<span className={styles.new}>{value?.new}</span>
							</div>
						) : null}
					</ul>
				))}
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setShowModal(false)}
					disabled={loading}
				>
					No
				</Button>

				<Button
					themeType="primary"
					onClick={handleApprove}
					loading={loading}
					disabled={loading}
				>
					Yes, Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ApprovalModal;
