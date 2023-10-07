import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FormItem from '../../../../common/FormItem';
import getPersonalDetailControls from '../../../../configurations/personalDetailControls';

import styles from './styles.module.css';

function PersonalDetailsModal({ detailModal, setDetailModal }) {
	const { info, openModal } = detailModal;
	const personalDetailControls = getPersonalDetailControls();

	const formhook = useForm();
	const { handleSubmit } = formhook;

	const submitHandler = (data) => {
		console.log(data, 'data', info);
	};

	return (
		<Modal show={openModal} onClose={() => setDetailModal({ openModal: false })} placement="top-right" size="sm">
			<Modal.Header title="Edit Personal Details" />
			<div className={styles.modal_body}>
				<FormItem formhook={formhook} controls={personalDetailControls} />
			</div>
			<Modal.Footer>
				<Button
					themeType="secondary"
					className={styles.cancel_btn}
					onClick={() => setDetailModal({ openModal: false })}
				>
					Cancel
				</Button>
				<Button themeType="accent" onClick={handleSubmit(submitHandler)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PersonalDetailsModal;
