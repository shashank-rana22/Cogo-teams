/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import { Modal, Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import Layout from '../../../commons/Layout';
import CreateForm from '../ConfigurationEngine/CreateComponent';

import BodyTextEditor from './BodyTextEditor';
import useCreateNewTagOrTopic from './hooks/useCreateTagOrTopic';
import PreviewQuestion from './QuestionPreview';
import styles from './styles.module.css';
import useCreateQuestions from './useCreateQuestions';

const style = {
	width   : '100%',
	padding : '12px',
};

function CreateFAQ() {
	const {
		editorValue,
		setEditorValue,
		handleSubmit,
		errors,
		control,
		onSubmit,
		controls,
		topicOptions,
		tagOptions,
		watch,
		getArray,
		questionPreview,
		setQuestionPreview,
		onClickPublish,
		showElements = {},
	} = useCreateQuestions();

	const {
		setConfigurationPage,
		handleSubmit: handleCreate,
		control: createFormControl,
		createFaqComponent,
		setValue = () => {},
		show,
		setShow,
		queryValue,
		handleCreateTag,
		handleCreateTopic,
	} = useCreateNewTagOrTopic();

	const router = useRouter();

	const onClickBackIcon = () => {
		router.back();
	};

	if (questionPreview === 'preview') {
		return (
			<PreviewQuestion
				onClickPublish={onClickPublish}
				setQuestionPreview={setQuestionPreview}
			/>
		);
	}

	return (
		<div>
			<div className={styles.back_div} onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.heading_text}>
				Create A Question
			</div>

			<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.input_container}>
					<div className={styles.input_label}>
						Name of the Question
					</div>

					<InputController
						control={control}
						name="question_abstract"
						type="input"
						placeholder="Create a question."
						rules={{ required: 'Question is required.' }}
					/>

					{errors.create_faq && (
						<span className={styles.errors}>
							{errors.create_faq.message}
						</span>
					)}

				</div>

				<div className={styles.flex_items}>

					<div className={styles.select_container}>
						<div className={styles.label_container}>
							<div className={styles.input_label}>
								Select Tags or
							</div>
							<div
								className={styles.create_tag_label}
								onClick={handleCreateTag}
							>
								Create New Tag
							</div>
						</div>
						<MultiselectController
							name="tag_ids"
							control={control}
							options={tagOptions}
						/>

					</div>

					<div className={styles.select_topic_container}>

						<div className={styles.label_container}>
							<div className={styles.input_label}>
								Select Topics or
							</div>
							<div
								className={styles.create_tag_label}
								onClick={handleCreateTopic}
							>
								Create New Topic
							</div>
						</div>

						<MultiselectController
							name="topic_ids"
							control={control}
							options={topicOptions}
						/>

					</div>

				</div>

				<div />

				<div className={styles.faq_answer_container}>
					<div className={styles.input_label}>
						Answer
					</div>
					<BodyTextEditor editorValue={editorValue} setEditorValue={setEditorValue} />

				</div>

				<Layout
					fields={controls}
					getArray={getArray}
					control={control}
					errors={errors}
					watch={watch}
					showElements={showElements}
				/>

				<div className={styles.button_container}>

					<Button themeType="tertiary" style={{ marginRight: '12px' }}>
						Cancel
					</Button>

					<Button type="submit">
						Preview & Publish
					</Button>
				</div>

			</form>

			<Modal
				size="md"
				show={show}
				onClose={() => setShow(false)}
				closeOnOuterClick={false}
				showCloseIcon
			>
				<Modal.Header title="Request your question here" />
				<Modal.Body>
					<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
						<CreateForm
							viewType={queryValue}
							setConfigurationPage={setConfigurationPage}
							handleSubmit={handleCreate}
							control={createFormControl}
							createFaqComponent={createFaqComponent}
							setValue={setValue}
							style={style}
							setShow={setShow}
							displayBackButton="No"
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleCreate(createFaqComponent)}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default CreateFAQ;
