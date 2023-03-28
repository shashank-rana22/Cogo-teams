import { Button } from '@cogoport/components';
import { ChipsController, TextAreaController } from '@cogoport/forms';
import { IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getElementController from '../../../../../../configs/getElementController';
import useUpdateCaseStudy from '../../../../hooks/useUpdateCaseStudy';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['topic', 'audience_ids', 'question_type', 'difficulty_level', 'questions'];

const getQuestionType = (question_type) => {
	if (question_type === 'case_study') {
		return 'Case Study';
	}

	return 'Stand Alone';
};

const getValue = ({ item, editDetails }) => {
	const { sub_question = [], question_type = '' } = editDetails || {};

	if (item === 'question_type') {
		return getQuestionType(question_type);
	}

	if (item === 'audience_ids') {
		return '--';
	}

	if (item === 'difficulty_level') {
		return startCase(editDetails?.[item] || '--');
	}

	if (item !== 'questions') {
		return editDetails?.[item] || '--';
	}

	return sub_question.length;
};

function ContentComponent({ editDetails, setShowForm }) {
	return (
		<div className={`${styles.container} ${styles.flex_row} ${styles.flex}`}>
			{constants.map((item) => (
				<div key={item} className={styles.flex_container}>
					<div className={styles.label}>{startCase(item)}</div>

					<div className={styles.value}>
						{getValue({ item, editDetails })}
					</div>
				</div>
			))}

			<div
				role="presentation"
				onClick={() => {
					setShowForm(true);
				}}
				className={styles.button_container}
			>
				<IcMEdit className={styles.button} />
			</div>
		</div>
	);
}

function FormComponent({
	isNewQuestion,
	controls,
	control,
	errors,
	questionTypeWatch,
	editDetails,
	handleUpdateCaseStudy,
	loading,
	setShowForm,
	setValue,
	mode,
}) {
	const closeForm = () => {
		const { topic = '', difficulty_level = '' } = editDetails || {};

		setValue('topic', topic);
		setValue('difficulty_level', difficulty_level);
		setValue('audience_ids', []);

		if (editDetails?.question_type === 'case_study') {
			setValue('question_type', editDetails?.question_type);
		} else {
			setValue('question_type', 'stand_alone');
		}

		setShowForm(false);
	};

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

					return (
						<div className={`${styles.control_container} ${styles[name]}`}>
							<div className={styles.label}>
								{label}
							</div>

							<div className={styles.control}>
								<Element
									control={control}
									{...controlItem}
									{...(name === 'question_type' ? { options: newOptions } : null)}
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
								{...controls[3]}
							/>
							{errors?.[controls[3].name] && <div className={styles.error_msg}>This is required</div>}
						</div>
					</div>

					<div style={{ marginBottom: mode === 'view' || isNewQuestion ? '16px' : '60px' }}>
						<TextAreaController
							control={control}
							{...controls[4]}
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

function BasicDetails({
	control,
	errors,
	isNewQuestion,
	editDetails,
	setValue,
	questionTypeWatch,
	getValues,
	setEditDetails,
	setAllKeysSaved,
	reset,
	getTestQuestionTest,
	questionSetId,
	mode,
}) {
	const [showForm, setShowForm] = useState(false);

	const controls = getControls({ mode });

	const {
		loading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const handleUpdateCaseStudy = () => {
		const formValues = getValues();
		const { audience_ids, topic, question_text, question_type, difficulty_level } = formValues || {};

		updateCaseStudy({
			values: {
				audience_ids,
				topic,
				question_text,
				question_type,
				difficulty_level,
			},
			id     : editDetails?.id,
			setEditDetails,
			setAllKeysSaved,
			reset,
			getTestQuestionTest,
			questionSetId,
			action : 'update',
		});
	};

	return (
		<div key={showForm}>
			{!isNewQuestion
				&& !showForm
				&& editDetails?.question_type === 'case_study' ? (
					<ContentComponent editDetails={editDetails} setShowForm={setShowForm} />
				) : (
					<FormComponent
						isNewQuestion={isNewQuestion}
						controls={controls}
						control={control}
						errors={errors}
						questionTypeWatch={questionTypeWatch}
						editDetails={editDetails}
						handleUpdateCaseStudy={handleUpdateCaseStudy}
						loading={loading}
						setValue={setValue}
						setShowForm={setShowForm}
						mode={mode}
					/>
				)}
		</div>
	);
}

export default BasicDetails;
