import { Modal, Button } from '@cogoport/components';
import { DatepickerController } from '@cogoport/forms';

import useEditServiceSchedule from '../hooks/useEditServiceSchedule';

import styles from './styles.module.css';

function FormItem({ finalControl = {}, control, errors = {} }) {
	const { name, label, lowerlabel, ...rest } = finalControl || {};

	const { message: errorMessage } = errors[name] || {};

	const { required } = finalControl.rules || {};

	return (
		<div className={styles.form_item}>
			<div className={`${styles.label} ${required ? styles.required : ''}`}>
				{label}
			</div>

			{lowerlabel ? <div className={styles.lower_label}>{lowerlabel}</div> : null}

			<DatepickerController name={name} control={control} {...rest} />

			{errorMessage ? (
				<span className={styles.error_message}>
					{errorMessage}
				</span>
			) : null}
		</div>
	);
}

export default function EditSchedule({ setShow = () => {}, timelineData = [] }) {
	const {
		loading,
		updateData,
		finalControls = [],
		formSubmit,
		errors,
		control,
	} = useEditServiceSchedule({ setShow, timelineData });

	const closeModal = () => setShow(false);

	return (
		<Modal
			size="md"
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title="Edit Timeline" />

			<Modal.Body>
				<form className={styles.form_container}>
					{finalControls?.map((finalControl) => (
						<FormItem
							key={finalControl.name}
							finalControl={finalControl}
							control={control}
							errors={errors}
						/>
					))}
				</form>
			</Modal.Body>

			<Modal.Footer>
				<Button
					disabled={loading}
					onClick={closeModal}
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button disabled={loading} onClick={formSubmit(updateData)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}
