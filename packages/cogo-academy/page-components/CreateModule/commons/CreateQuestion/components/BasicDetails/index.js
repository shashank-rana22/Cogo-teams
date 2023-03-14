import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function BasicDetails({ setQuestionTypeWatch }) {
	const {
		watch,
		// handleSubmit = () => {},
		formState: { errors = {} },
		// reset,
		// setValue,
		// getValues,
		control,
	} = useForm();

	const controls = getControls();

	const questionTypeWatch = watch('question_type');

	useEffect(() => {
		setQuestionTypeWatch(questionTypeWatch);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionTypeWatch]);

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name } = controlItem || {};

				const Element = getElementController(type);

				return (
					<div className={`${styles.control_container} ${styles[name]}`}>
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
	);
}

export default BasicDetails;
