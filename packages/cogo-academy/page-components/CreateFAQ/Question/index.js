import { Modal, Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useState } from 'react';

import Spinner from '../../../commons/Spinner';
import CreateUserForm from '../ConfigurationEngine/CreateAudienceForm';
import CreateForm from '../ConfigurationEngine/CreateComponent';

import BodyTextEditor from './BodyTextEditor';
import useCreateNewTagOrTopic from './hooks/useCreateTagOrTopic';
import useGetQuestion from './hooks/useGetQuestion';
import PreviewQuestion from './QuestionPreview';
import styles from './styles.module.css';
import useCreateQuestions from './useCreateQuestions';

const style = {
	width   : '100%',
	padding : 12,
};

const userFormStyle = {
	controllerStyle: {
		width: '100%',
	},
	buttonContainerStyle: {
		justifyContent: 'flex-end',
	},
};

function CreateFAQ() {
	const router = useRouter();
	const [editorError, setEditorError] = useState(false);

	const { fetchQuestion, query, data, loading } = useGetQuestion();

	const {
		editorValue,
		setEditorValue,
		handleSubmit,
		errors,
		control,
		onSubmit,
		topicOptions,
		tagOptions,
		setValue: setQuestionValue,
		questionPreview,
		setQuestionPreview,
		onClickPublish,
		showModalOnCancel,
		setShowModalOnCancel,
		audienceOptions,
		handleAudienceSearch,
		fetchTopics,
		fetchTags,
		fetchAudiences,
		RichTextEditor,
		listTopicsLoading,
		listTagsLoading,
		listAudienceLoading,
		apiLoading,
	} = useCreateQuestions({ data, setEditorError });

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
		formErrors,
		onClickCancelButton,
		showCreateAudienceModal,
		setShowCreateAudienceModal,
	} = useCreateNewTagOrTopic({ fetchTopics, fetchTags });

	const {
		question_abstract,
		faq_tags = [],
		faq_topics = [],
		answers = [],
		faq_audiences = [],
	} = data || {};

	useEffect(() => {
		if (query?.id) {
			fetchQuestion();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	const filterTags = [];
	(faq_tags || []).forEach((item) => {
		filterTags.push(item?.id);
	});

	const filterTopics = [];
	(faq_topics || []).forEach((item) => {
		filterTopics.push(item?.id);
	});

	const filterAudiences = [];
	(faq_audiences || []).forEach((item) => {
		filterAudiences.push(item?.id);
	});

	useEffect(() => {
		if (!loading) {
			setQuestionValue('question_abstract', question_abstract);
			setQuestionValue('tag_ids', filterTags);
			setQuestionValue('topic_ids', filterTopics);
			setQuestionValue('audience_ids', filterAudiences);
			setEditorValue(RichTextEditor?.createValueFromString((answers?.[0]?.answer || ''), 'html'));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listTopicsLoading, listTagsLoading, listAudienceLoading, JSON.stringify(data)]);

	useEffect(() => {
		if (questionPreview !== 'preview') {
			fetchTopics();
			fetchTags();
			fetchAudiences();
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickBackIcon = () => {
		router.back();
	};

	const onClickYesButton = () => {
		setShowModalOnCancel(false);
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

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="6px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.back_div} onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>

			<div className={styles.heading_text}>
				{data ? 'Update' : 'Create'}
				{' '}
				A Question
			</div>

			<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.input_container}>
					<div className={styles.input_label}>
						Question
					</div>

					<InputController
						control={control}
						name="question_abstract"
						type="input"
						placeholder="Create a question."
						key={question_abstract}
						rules={{ required: 'Question is required.' }}
					/>

					{errors.question_abstract && (
						<span className={styles.errors}>
							{errors.question_abstract.message}
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
							value={filterTags}
							options={tagOptions}
							rules={{ required: 'Tags are required.' }}
						/>
						{errors.tag_ids && (
							<span className={styles.errors}>
								{errors.tag_ids.message}
							</span>
						)}

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
							rules={{ required: 'Topics are required.' }}
						/>
						{errors.topic_ids && (
							<span className={styles.errors}>
								{errors.topic_ids.message}
							</span>
						)}

					</div>

				</div>

				<div className={styles.select_topic_container}>

					<div className={styles.label_container}>
						<div className={styles.input_label}>
							Select Audience or
						</div>
						<div
							className={styles.create_tag_label}
							onClick={() => setShowCreateAudienceModal(true)}
						>
							Create New Audience
						</div>
					</div>

					<MultiselectController
						name="audience_ids"
						control={control}
						onSearch={handleAudienceSearch}
						options={audienceOptions}
					/>
				</div>

				<div className={styles.faq_answer_container}>
					<div className={styles.input_label}>
						Answer
					</div>

					<BodyTextEditor
						editorValue={editorValue}
						setEditorValue={setEditorValue}
						setEditorError={setEditorError}
					/>

					{editorError && (
						<span className={styles.errors}>
							Answer is required
						</span>
					)}

				</div>

				<div className={styles.button_container}>

					<Button
						themeType="tertiary"
						style={{ marginRight: '12px' }}
						onClick={() => setShowModalOnCancel(true)}
						disabled={apiLoading}
					>
						Cancel
					</Button>

					<Button
						type="submit"
						loading={apiLoading}
					>
						Preview
					</Button>
				</div>

			</form>

			<Modal
				size="md"
				show={show}
				onClose={() => setShow(false)}
				closeOnOuterClick={false}
				showCloseIcon={false}
			>
				<Modal.Header title={`Add new ${queryValue} here`} />

				<Modal.Body>
					<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
						<CreateForm
							source="create"
							viewType={queryValue}
							setConfigurationPage={setConfigurationPage}
							handleSubmit={handleCreate}
							control={createFormControl}
							createFaqComponent={createFaqComponent}
							setValue={setValue}
							style={style}
							setShow={setShow}
							displayBackButton="No"
							errors={formErrors}
						/>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						themeType="secondary"
						style={{ marginRight: 8 }}
						onClick={onClickCancelButton}
					>
						CANCEL
					</Button>

					<Button type="button" onClick={handleCreate(createFaqComponent)}>
						SUBMIT
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				size="md"
				show={showModalOnCancel}
				onClose={() => setShowModalOnCancel(false)}
				closeOnOuterClick={false}
				showCloseIcon
			>
				<Modal.Header title="Confirm your action" />

				<Modal.Body>
					<div className={styles.text_wrapper}>
						Your current changes will not be saved, Are you sure want to cancel ?
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						themeType="tertiary"
						style={{ marginRight: 8 }}
						onClick={() => setShowModalOnCancel(false)}
					>
						No
					</Button>

					<Button
						type="button"
						onClick={onClickYesButton}
					>
						Yes
					</Button>

				</Modal.Footer>
			</Modal>

			<Modal
				size="md"
				show={showCreateAudienceModal}
				onClose={() => setShowCreateAudienceModal(false)}
				closeOnOuterClick={false}
				showCloseIcon
			>
				<Modal.Header title="Create audience" />

				<Modal.Body>
					<CreateUserForm
						source="create"
						setShowCreateAudienceModal={setShowCreateAudienceModal}
						setConfigurationPage={setConfigurationPage}
						displayBackButton="No"
						customStyle={userFormStyle}
						fetchAudiences={fetchAudiences}
					/>
				</Modal.Body>
			</Modal>

		</div>
	);
}

export default CreateFAQ;
