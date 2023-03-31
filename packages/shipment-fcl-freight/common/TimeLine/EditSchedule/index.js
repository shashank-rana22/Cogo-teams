import { Modal, Button } from '@cogoport/components';
import { DatepickerController } from '@cogoport/forms';

import useEditServiceSchedule from '../hooks/useEditServiceSchedule';

import styles from './styles.module.css';

function FormItem({ finalControl = {}, control, errors }) {
	const { name, label, lowerlabel, ...rest } = finalControl;

	const { message: errorMessage } = errors[name] || {};
	const { required } = finalControl.rules || {};

	return (
		<div className={styles.form_item}>
			<div className={`${styles.label} ${required ? styles.required : ''}`}>
				{label}
				{errorMessage ? (
					<span className={styles.error_message}>
						{errorMessage}
					</span>
				) : null}
			</div>
			{lowerlabel ? <div className={styles.lower_label}>{lowerlabel}</div> : null}
			<DatepickerController name={name} control={control} {...rest} />
		</div>
	);
}

export default function EditSchedule({ show = false, setShow = () => {}, timelineData = [] }) {
	const {
		loading, updateData, finalControls, formSubmit, errors, control,
	} = useEditServiceSchedule({ setShow, timelineData });

	return (
		<Modal size="md" show={show} onClose={() => setShow(false)} placement="top" closeOnOuterClick={false} >
			<Modal.Header title="Edit Timeline" />
			<Modal.Body>
				<form className={styles.form_container}>
					{finalControls.map((finalControl) => (
						<FormItem
							finalControl={finalControl}
							control={control}
							errors={errors}
						/>
					))}
				</form>
			</Modal.Body>
			<Modal.Footer><Button disabled={loading} onClick={formSubmit(updateData)}>Save</Button></Modal.Footer>
		</Modal>
	);
}
