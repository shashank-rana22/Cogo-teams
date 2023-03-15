import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getElementController from '../../../../../../configs/getElementController';
import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';

import getControls from './controls';
import styles from './styles.module.css';

function BasicDetailsForm({ setQuestionSetId }) {
	const { control, formState:{ errors }, handleSubmit } = useForm();

	const controls = getControls();

	const {
		loading,
		createQuestionSet,
	} = useCreateQuestionSet();

	const onSubmit = (values) => {
		createQuestionSet({ values, setQuestionSetId });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			<div className={styles.form_component}>
				{controls.map((controlItem) => {
					const { type, label, name } = controlItem || {};

					const Element = getElementController(type);

					return (
						<div className={styles.control_container}>
							<div className={styles.label}>
								{label}
							</div>

							<div className={styles.control}>
								<Element control={control} {...controlItem} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button loading={loading} size="sm" type="submit">Create</Button>
			</div>
		</form>
	);
}

export default BasicDetailsForm;
