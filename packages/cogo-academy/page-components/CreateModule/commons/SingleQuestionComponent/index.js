import { Button } from '@cogoport/components';
import { SelectController, InputController, ChipsController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import OptionsComponent from './OptionsComponent';
import styles from './styles.module.css';
import useHandleSingleQuestion from './useHandleSingleQuestion';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require
	RichTextEditor = require('react-rte').default;
}

function SingleQuestionComponent({
	control,
	register,
	index,
	name = 'case_questions',
	errors,
	field,
	isNewQuestion,
	questionTypeWatch,
	editDetails,
	mode,
	editorValue,
	setEditorValue,
	...restProps
}) {
	const {
		handleUpdateCaseStudyQuestion,
		handleDelete,
		loading,
		NAME_CONTROL_MAPPING,
		handleChangeEditorValue,
	} = useHandleSingleQuestion({
		mode,
		editDetails,
		field,
		index,
		questionTypeWatch,
		editorValue,
		setEditorValue,
		...restProps,
	});

	return (
		<div className={styles.container}>
			<div
				className={`${styles.first_row} ${
					errors?.question_text ? styles.question_text_err : null
				} ${errors?.question_type ? styles.question_type_err : null}`}
			>
				<InputController
					className={`${
						errors?.question_text ? styles.question_text_err : null
					} ${styles.input_container}`}
					{...NAME_CONTROL_MAPPING.question_text}
					control={control}
					name={`${name}.${index}.question_text`}
				/>

				<SelectController
					className={`${styles.question_type} ${
						errors?.question_type
							? styles.question_type_err
							: null
					}`}
					{...NAME_CONTROL_MAPPING.question_type}
					control={control}
					name={`${name}.${index}.question_type`}
				/>
			</div>

			<OptionsComponent
				key={JSON.stringify(editorValue)}
				control={control}
				{...NAME_CONTROL_MAPPING.options}
				register={register}
				errors={errors?.options || {}}
				name={`${name}.${index}.options`}
				mode={mode}
				isNewQuestion={questionTypeWatch === 'case_study' ? isNewQuestion : isEmpty(editDetails)}
			/>

			{questionTypeWatch !== 'case_study' ? (
				<div className={styles.difficulty_level}>
					<div className={styles.label}>Set Difficulty level</div>

					<div className={styles.control}>
						<ChipsController
							control={control}
							{...NAME_CONTROL_MAPPING.difficulty_level}
							name={`${name}.${index}.difficulty_level`}
						/>
						{errors?.difficulty_level && <div className={styles.error_msg}>This is required</div>}
					</div>
				</div>
			) : null}

			<div className={styles.textarea_container}>
				<RichTextEditor
					value={
					questionTypeWatch === 'stand_alone'
						? editorValue.question_0_explanation
						: editorValue[`case_questions_${index}_explanation`]
					}
					onChange={handleChangeEditorValue}
					required
					id="body-text"
					name="bodyText"
					type="string"
					multiline
					variant="filled"
					rootStyle={{
						zIndex    : 0,
						position  : 'relative',
						minHeight : '200px',
					}}
				/>
			</div>

			{questionTypeWatch === 'case_study' && mode !== 'view' && !isEmpty(editDetails) ? (
				<div className={styles.button_container}>
					<Button
						loading={loading}
						onClick={() => handleDelete()}
						themeType="accent"
						size="sm"
						type="button"
					>
						Delete
					</Button>

					{/* {isNewQuestion ? ( */}
					<Button
						style={{ marginLeft: '12px' }}
						loading={loading}
						onClick={() => handleUpdateCaseStudyQuestion()}
						size="sm"
						type="button"
					>
						{field?.isNew ? 'Save' : 'Edit'}
					</Button>
					{/* ) : null} */}
				</div>
			) : null}
		</div>
	);
}

export default SingleQuestionComponent;
