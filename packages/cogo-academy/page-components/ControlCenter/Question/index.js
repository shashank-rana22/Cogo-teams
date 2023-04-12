import { Modal, Button } from '@cogoport/components';
import { InputController, MultiselectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import QuestionFeedBack from '../../../commons/QuestionFeedBack';
import Spinner from '../../../commons/Spinner';
import CreateUserForm from '../ConfigurationEngine/CreateAudienceForm';
import CreateForm from '../ConfigurationEngine/CreateComponent';

import Aliases from './Aliases';
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

	const { fetchQuestion, query, data = {}, loading, mode } = useGetQuestion();

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
		showAlias,
		setShowAlias,
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
		faq_tags,
		faq_topics,
		answers,
		faq_audiences,
		id,
		question_aliases,
	} = data || {};

	useEffect(() => {
		if (query?.id) {
			fetchQuestion();
		}
	}, [fetchQuestion, query?.id, mode]);

	const filterTags = useMemo(() => (faq_tags || []).map((item) => item.id) || [], [faq_tags]);
	const filterTopics = useMemo(() => (faq_topics || []).map((item) => item.id) || [], [faq_topics]);
	const filterAudiences = useMemo(() => (faq_audiences || []).map((item) => item.id) || [], [faq_audiences]);
	const answer = answers?.[0]?.answer;

	useEffect(() => {
		if (!loading) {
			setQuestionValue('question_abstract', question_abstract);
			setQuestionValue('tag_ids', filterTags);
			setQuestionValue('topic_ids', filterTopics);
			setQuestionValue('audience_ids', filterAudiences);
			setEditorValue(RichTextEditor?.createValueFromString((answer || ''), 'html'));
			setShowAlias(question_aliases);
		}
	}, [listTopicsLoading,
		listTagsLoading,
		listAudienceLoading,
		loading,
		setQuestionValue,
		question_abstract,
		filterTags,
		filterTopics,
		filterAudiences,
		setEditorValue,
		RichTextEditor,
		answer,
		setShowAlias,
		question_aliases]);

	useEffect(() => {
		if (questionPreview !== 'preview') {
			fetchTopics();
			fetchTags();
			fetchAudiences();
		}
	}, [fetchAudiences, fetchTags, fetchTopics, questionPreview]);

	const onClickBackIcon = () => {
		router.back();
	};

	const onClickYesButton = () => {
		setShowModalOnCancel(false);
		setQuestionPreview('preview');
		router.back();
	};

	const filteredAliases = (showAlias || []).filter((ele) => ele?.status !== 'inactive');

	if (questionPreview === 'preview' && editorValue.toString('html') !== '') {
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
		<div className={styles.container}>
			<div className={styles.question_container}>
				<div role="presentation" className={styles.back_div} onClick={onClickBackIcon}>
					<IcMArrowBack width={20} height={20} />
					<div className={styles.back}>Back to Dashboard</div>
				</div>

				<div className={styles.heading_text}>
					{!isEmpty(data) ? 'Update' : 'Create'}
					{' '}
					A Question
				</div>

				<form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>

					<div className={styles.input_container}>
						<div>
							<div className={styles.input_label}>
								Question
							</div>

						</div>

						<div className={styles.question_alias}>
							<div style={{ width: isEmpty(filteredAliases) ? '88%' : '100%' }}>

								<InputController
									control={control}
									name="question_abstract"
									type="input"
									placeholder="Create a question."
									key={question_abstract}
									rules={{ required: 'Question is required.' }}
								/>

								{errors?.question_abstract && (
									<span className={styles.errors}>
										{errors.question_abstract.message}
									</span>
								)}

							</div>

							{ isEmpty(filteredAliases) && (
								<div
									className={styles.alias}
									role="presentation"
									onClick={() => setShowAlias(
										[{ id: (showAlias || []).length, question_abstract: '' }],
									)}
								>
									Add Alias
								</div>
							)}

						</div>
						{
							!isEmpty(filteredAliases) && (filteredAliases || [])
								.map((alias) => (
									<Aliases
										showAlias={showAlias}
										setShowAlias={setShowAlias}
										key={alias?.id}
										alias={alias}
										filteredAliases={filteredAliases}
									/>
								))
							}

					</div>

					<div className={styles.flex_items}>

						<div className={styles.select_container}>
							<div className={styles.label_container}>
								<div className={styles.input_label}>
									Select Tags or
								</div>
								<div
									role="presentation"
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
							{errors?.tag_ids && (
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
									role="presentation"
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
							{errors?.topic_ids && (
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
								role="presentation"
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
							rules={{ required: 'Audience is required.' }}
						/>
						{errors?.audience_ids && (
							<span className={styles.errors}>
								{errors.audience_ids.message}
							</span>
						)}
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

				{show
				&& (
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
				)}

				{showModalOnCancel
				&& (
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
				)}

				{showCreateAudienceModal

				&& (
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
				)}

			</div>

			<div className={styles.feedback_container}>
				<QuestionFeedBack id={id} source="create" fetchQuestion={fetchQuestion} />
			</div>

		</div>
	);
}

export default CreateFAQ;
