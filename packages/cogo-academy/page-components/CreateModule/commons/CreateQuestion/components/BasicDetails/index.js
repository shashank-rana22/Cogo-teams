import { Button } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';
import { IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getElementController from '../../../../../../configs/getElementController';
import useUpdateCaseStudy from '../../../../hooks/useUpdateCaseStudy';

import getControls from './controls';
import styles from './styles.module.css';

const constants = ['topic', 'audience_ids', 'question_type'];

const getQuestionType = (question_type) => {
	if (question_type === 'case_study') {
		return 'Case Study';
	}

	return 'Stand Alone';
};

function ContentComponent({ editDetails, setShowForm }) {
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
}) {
	const closeForm = () => {
		setValue('topic', editDetails?.topic);
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

			{!isNewQuestion && editDetails?.question_type === 'case_study' ? (
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
}) {
	const [showForm, setShowForm] = useState(false);

	const controls = getControls();

	const {
		loading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const handleUpdateCaseStudy = () => {
		const formValues = getValues();
		const { audience_ids, topic, question_text, question_type } = formValues || {};

		updateCaseStudy({
			values: {
				audience_ids,
				topic,
				question_text,
				question_type,
			},
			id: editDetails?.id,
			setEditDetails,
			setAllKeysSaved,
			reset,
			getTestQuestionTest,
			questionSetId,
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
					/>
				)}
		</div>
	);
}

export default BasicDetails;
