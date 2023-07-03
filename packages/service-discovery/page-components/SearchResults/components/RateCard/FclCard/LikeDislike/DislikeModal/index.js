import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import useDislikeFeedback from '../../../../../hooks/useDislikeFeedback';

import DislikeFeedbackForm from './DislikeFeedbackForm';
import styles from './styles.module.css';

function DislikeModal({
	details = {},
	rate,
	show = false,
	onClose = () => {},
	setLikeState = () => {},
}) {
	const { control, formState:{ errors }, handleSubmit, watch } = useForm();

	const { onSubmitFeedback, loading } = useDislikeFeedback({ details, rate, onClose, setLikeState });

	const formValues = watch();

	const onSubmit = (values) => {
		onSubmitFeedback(values);
	};

	const renderButton = ({
		btnText = '',
		isFirstBtn = false,
		onClick = () => {},
		themeType,
		size,
		isSubmitBtn = false,
	}) => (
		<Button
			type="button"
			size={size || 'md'}
			themeType={themeType || 'primary'}
			onClick={onClick}
			style={{ marginRight: isFirstBtn ? 12 : 0 }}
			disabled={loading}
			loading={isSubmitBtn && loading}
		>
			{btnText}
		</Button>
	);

	return (
		<Modal size="md" show={show} onClose={onClose} placement="right">
			<Modal.Header title="Reason for dislike" />

			<Modal.Body>
				<DislikeFeedbackForm
					details={details}
					rate={rate}
					control={control}
					errors={errors}
					formValues={formValues}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.buttons_container}>

					{renderButton({ btnText: 'Cancel', themeType: 'secondary', isFirstBtn: true, onClick: onClose })}

					{renderButton({ btnText: 'Submit', onClick: handleSubmit(onSubmit), isSubmitBtn: true })}
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DislikeModal;
