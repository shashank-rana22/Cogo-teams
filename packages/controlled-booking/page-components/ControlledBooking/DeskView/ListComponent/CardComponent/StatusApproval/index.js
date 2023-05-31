import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useStateUpdate from '../../../../../../hooks/useStateUpdate';

import ApprovalForm from './ApprovalForm';
import RejectionForm from './RejectionForm';
import styles from './styles.module.css';

const MAPPING = {
	rejected : 'Reject',
	approved : 'Approve',
};

function StatusApproval({ item, refetchBookingList }) {
	const [showModal, setShowModal] = useState(false);

	const { checkout_approvals = [] } = item;

	const { control, handleSubmit, formState:{ errors = {} }, watch, setValue } = useForm();

	const { updateState = () => {}, loading } = useStateUpdate({
		id: checkout_approvals?.[0]?.id,
		refetchBookingList,
		setShowModal,
		showModal,
	});

	const formValues = watch();

	return (
		<div className={styles.container}>

			<div className={styles.button}>
				<Button size="sm" themeType="secondary" disbaled={loading} onClick={() => setShowModal('rejected')}>
					Reject
				</Button>
			</div>

			<Button size="sm" themeType="primary" disbaled={loading} onClick={() => setShowModal('approved')}>
				Approve
			</Button>

			{showModal ? (
				<Modal
					show={showModal}
					placement="center"
					closeOnOuterClick={false}
					onClose={() => setShowModal(false)}
					className={styles.modal}
				>
					<Modal.Header title={`Are you sure you want to ${MAPPING[showModal]}?`} />

					<Modal.Body className={styles.preview_modal_body}>
						{showModal === 'rejected' ? (
							<RejectionForm control={control} errors={errors} />
						) : null}

						{showModal === 'approved' ? (
							<ApprovalForm
								control={control}
								errors={errors}
								setValue={setValue}
								formValues={formValues}
								checkout_approvals={checkout_approvals}
							/>
						) : null}

					</Modal.Body>

					<Modal.Footer>
						<div className={styles.button}>
							<Button
								size="sm"
								themeType="secondary"
								disbaled={loading}
								onClick={() => setShowModal(false)}
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
							{MAPPING[showModal]}
						</Button>

					</Modal.Footer>

				</Modal>
			) : null}

		</div>

	);
}

export default StatusApproval;
