import { Button } from '@cogoport/components';
import { TextAreaController, ChipsController } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';

import getElementController from '../../../../../../../configs/getElementController';
import useHandleBasicDetails from '../useHandleBasicDetails';

import styles from './styles.module.css';

function FormComponent({
	isNewQuestion,
	control,
	errors,
	questionTypeWatch,
	editDetails,
	mode,
	setValue,
	setEditDetails,
	reset,
	getValues,
	questionSetId,
	getTestQuestionTest,
	setAllKeysSaved,
	setShowForm,
}) {
	const {
		handleUpdateCaseStudy,
		loading,
		controls,
		closeForm,
	} = useHandleBasicDetails({
		setEditDetails,
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		editDetails,
		mode,
		getValues,
		reset,
		setValue,
		setShowForm,
	});

	return (
		<div className={`${styles.container} ${!isNewQuestion ? styles.flex_row : null}`}>
			<div className={styles.upper_form}>
				{controls.map((controlItem) => {
					const { type, label, name, options = [] } = controlItem || {};

					if (['question_text', 'difficulty_level'].includes(name)) {
						return null;
					}

					let newOptions = options;

					if (name === 'question_type' && !isNewQuestion) {
						newOptions = options.map((item) => ({ ...item, disabled: true }));
					}

					const Element = getElementController(type);

					if (!Element) return null;

					return (
						<div key={name} className={`${styles.control_container} ${styles[name]}`}>
							<div className={styles.label}>
								{label}
							</div>

							<div className={styles.control}>
								<Element
									control={control}
									{...controlItem}
									{...(name === 'question_type' ? { options: newOptions } : {})}
								/>
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>

			{questionTypeWatch === 'case_study' ? (
				<>
					<div className={styles.difficulty_level}>
						<div className={styles.difficulty_level_label}>Set Difficulty level</div>

						<div className={styles.control}>
							<ChipsController
								control={control}
								{...((controls || []).find((item) => item.name === 'difficulty_level'))}
							/>
							{errors?.difficulty_level && <div className={styles.error_msg}>This is required</div>}
						</div>
					</div>

					<div style={{ marginBottom: mode === 'view' || isNewQuestion ? '16px' : '60px' }}>
						<TextAreaController
							control={control}
							{...((controls || []).find((item) => item.name === 'question_text'))}
						/>
						{errors?.question_text ? <div className={styles.error_msg}>This is required</div> : null}
					</div>
				</>
			) : null}

			{!isNewQuestion && editDetails?.question_type === 'case_study' && mode !== 'view' ? (
				<Button
					className={styles.edit_button}
					size="sm"
					type="button"
					loading={loading}
					onClick={() => handleUpdateCaseStudy()}
				>
					Edit
				</Button>
			) : null}

			{!isNewQuestion && editDetails?.question_type === 'case_study' ? (
				<div
					role="presentation"
					onClick={() => closeForm()}
					className={styles.cancel_button}
				>
					<IcMCrossInCircle />
				</div>
			) : null}
		</div>
	);
}

export default FormComponent;
