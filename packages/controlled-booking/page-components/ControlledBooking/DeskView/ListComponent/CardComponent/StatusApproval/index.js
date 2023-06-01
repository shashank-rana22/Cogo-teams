import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useStateUpdate from '../../../../../../hooks/useStateUpdate';

import ApprovalForm from './ApprovalForm';
import RejectionForm from './RejectionForm';
import styles from './styles.module.css';

const LABEL_MAPPING = {
	rejected : 'Reject',
	approved : 'Approve',
};

const FORM_MAPPING = {
	approved : ApprovalForm,
	rejected : RejectionForm,
};

function StatusApproval({ item, refetchBookingList }) {
	const [modalType, setModalType] = useState('');

	const { checkout_detail = [] } = item;
	const { detail } = checkout_detail;
	const { checkout_approvals } = detail || {};
	const { control, handleSubmit, formState: { errors = {} }, watch, setValue } = useForm();

	const { updateState = () => {}, loading } = useStateUpdate({
		id: checkout_approvals?.[0]?.id,
		refetchBookingList,
		setModalType,
		modalType,
	});

	const formValues = watch();

	const PROPS_MAPPING = {
		approved: {
			control,
			errors,
			setValue,
			formValues,
			checkout_approvals,
		},
		rejected: {
			control,
			errors,
		},
	};

	const FormComponent = FORM_MAPPING[modalType];

	return (
		<div className={styles.container}>

			<div className={styles.button}>
				<Button size="sm" themeType="secondary" disbaled={loading} onClick={() => setModalType('rejected')}>
					Reject
				</Button>
			</div>

			<Button
				size="sm"
				themeType="primary"
				disbaled={loading}
				onClick={() => setModalType('approved')}
			>
				Approve
			</Button>

			{modalType ? (
				<Modal
					show={modalType}
					placement="center"
					closeOnOuterClick={false}
					onClose={() => setModalType(false)}
					className={styles.modal}
				>
					<Modal.Header title={`Are you sure you want to ${LABEL_MAPPING[modalType]}?`} />
					<Modal.Body className={styles.preview_modal_body}>
						<FormComponent {...PROPS_MAPPING[modalType]} />
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.button}>
							<Button
								size="sm"
								themeType="secondary"
								disbaled={loading}
								onClick={() => setModalType(false)}
							>
								cancel
							</Button>
						</div>

						<Button
							size="sm"
							themeType="primary"
							disbaled={loading}
							onClick={handleSubmit(updateState)}
						>
							{LABEL_MAPPING[modalType]}
						</Button>

					</Modal.Footer>

				</Modal>
			) : null}

		</div>

	);
}

export default StatusApproval;
