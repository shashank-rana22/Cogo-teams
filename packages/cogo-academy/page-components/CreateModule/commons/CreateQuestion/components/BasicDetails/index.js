import { Button } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';
import { IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getElementController from '../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['topic', 'audience_ids', 'question_type'];

const getQuestionType = (question_type) => {
	if (question_type === 'case_study') {
		return 'Case Study';
	}

	return 'Stand Alone';
};

function BasicDetails({ control, errors, isNewQuestion, editDetails, setValue, questionTypeWatch }) {
	const [showForm, setShowForm] = useState(false);

	const controls = getControls();

	const editForm = () => {
		setValue('topic', editDetails?.topic);
		setValue('audience_ids', editDetails?.audience_ids);

		if (editDetails?.question_type === 'case_study') {
			setValue('question_type', editDetails?.question_type);
		} else {
			setValue('question_type', 'stand_alone');
		}

		setShowForm(true);
	};

	if (!isNewQuestion && !showForm) {
		return (
			<div className={`${styles.container} ${styles.flex_row} ${styles.flex}`}>
				{constants.map((item) => (
					<div className={styles.flex_container}>
						<div className={styles.label}>{startCase(item)}</div>

						<div className={styles.value}>
							{item === 'question_type'
								? getQuestionType(editDetails?.question_type)
								: editDetails?.[item] || '--'}
						</div>
					</div>
				))}

				<div className={styles.button_container}>
					<IcMEdit className={styles.button} onClick={() => editForm()} />
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${!isNewQuestion ? styles.flex_row : null}`}>
			<div className={styles.upper_form}>
				{controls.map((controlItem) => {
					const { type, label, name } = controlItem || {};

					if (name === 'question_text') {
						return null;
					}

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

			{questionTypeWatch === 'case_study' ? (
				<div className={!isNewQuestion ? styles.bottom : null}>
					<TextAreaController
						control={control}
						{...controls[3]}
					/>
					{errors?.question_text ? <div className={styles.error_msg}>This is required</div> : null}
				</div>
			) : null}

			{!isNewQuestion ? (
				<Button
					className={styles.edit_button}
					size="sm"
					type="button"
				>
					Edit
				</Button>
			) : null}

			{!isNewQuestion ? (
				<div
					role="presentation"
					onClick={() => setShowForm(false)}
					className={styles.cancel_button}
				>
					<IcMCrossInCircle />
				</div>
			) : null}
		</div>
	);
}

export default BasicDetails;
