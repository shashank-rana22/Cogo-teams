import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import FormItem from '../../../../common/FormItems';
import getPersonalDetailControls from '../../../../configurations/personalDetailsControls';

import styles from './styles.module.css';

function PersonalDetailsModal({ detailModal = {}, setDetailModal }) {
	const { info, openModal } = detailModal;

	const personalDetailControls = getPersonalDetailControls();

	const formhook = useForm();
	const { setValue } = formhook;

	useEffect(() => {
		if (!isEmpty(info)) {
			setValue('firstName', info?.insuredFirstName);
			setValue('lastName', info?.insuredLastName);
			setValue('email', info?.email);
			setValue('phoneNo', info?.phoneNo);
		}
	}, [info, setValue]);

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

				<Button themeType="accent">Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PersonalDetailsModal;
