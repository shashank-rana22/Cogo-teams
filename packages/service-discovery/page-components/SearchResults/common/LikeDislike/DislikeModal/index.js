import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useDislikeFeedback from '../../../hooks/useDislikeFeedback';

import DislikeFeedbackForm from './DislikeFeedbackForm';
import styles from './styles.module.css';

function DislikeModal({
	details = {},
	rate = {},
	show = false,
	onClose = () => {},
	setLikeState = () => {},
	setShowSuccessModal = () => {},
	likeState = {},
	isMobile = false,
}) {
	const { control, formState:{ errors }, handleSubmit, watch, setValue } = useForm();

	const { onSubmitFeedback, loading } = useDislikeFeedback({ details, rate, onClose, setLikeState, likeState });

	const formValues = watch();

	const onSubmit = async (values) => {
		const done = await onSubmitFeedback(values);

		if (done) {
			setShowSuccessModal(true);
		}
	};

	const BUTTONS_MAPPING = [
		{
			label     : 'Cancel',
			onClick   : onClose,
			themeType : 'secondary',
			disabled  : loading,
		},
		{
			label     : 'Submit',
			onClick   : handleSubmit(onSubmit),
			themeType : 'primary',
			loading,
		},
	];

	return (
		<Modal size="md" show={show} onClose={onClose} placement={isMobile ? 'bottom' : 'right'}>
			<Modal.Header title="Reason for dislike" />

			<Modal.Body>
				<DislikeFeedbackForm
					details={details}
					rate={rate}
					control={control}
					errors={errors}
					formValues={formValues}
					watch={watch}
					setValue={setValue}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.buttons_container}>
					{BUTTONS_MAPPING.map((buttonItem, index) => {
						const { label, ...restProps } = buttonItem;

						return (
							<Button
								key={label}
								type="button"
								style={{ marginRight: !index ? '12px' : '0px' }}
								{...restProps}
							>
								{label}
							</Button>
						);
					})}
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DislikeModal;
