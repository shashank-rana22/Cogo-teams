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

function StatusApproval({ item, refetchBookingList }) {
	const [modalType, setModalType] = useState('');

	const { checkout_detail = [] } = item;
	const { detail } = checkout_detail;
	const { checkout_approvals } = detail || {};

	const { advance_payment_info } = checkout_approvals?.[0] || {};

	const { control, handleSubmit, formState: { errors = {} }, watch, setValue } = useForm();

	const { updateState = () => {}, loading } = useStateUpdate({
		id: checkout_approvals?.[0]?.id,
		refetchBookingList,
		setModalType,
		modalType,
	});

	const formValues = watch();

	const formMapping = {
		approved: <ApprovalForm
			control={control}
			errors={errors}
			setValue={setValue}
			formValues={formValues}
			checkout_approvals={checkout_approvals}
		/>,

		rejected: <RejectionForm control={control} errors={errors} />,

	};

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
				disbaled={loading || advance_payment_info?.eligible_for_booking}
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
						{formMapping[modalType]}
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
