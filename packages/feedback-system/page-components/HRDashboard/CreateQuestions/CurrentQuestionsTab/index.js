import { Pagination, Button, Placeholder, toast } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import CreateForm from '../../../../common/CreateForm';
import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import Questions from '../../../../common/Questions';
import RoleSelect from '../../../../common/RoleSelect';
import useAddFeedbackQuestion from '../../../../hooks/useAddFeedbackQuestion';
import useListFeedbackQuestions from '../../../../hooks/useListFeedbackQuestions';
import useSaveFeedbackQuestions from '../../../../hooks/useSaveFeedbackQuestions';
import useUpdateFeedbackQuestions from '../../../../hooks/useUpdateFeedbackQuestions';

import styles from './styles.module.css';

function CurrentQuestionsTab({ showQuestion = false }) {
	const [changeQuestions, setChangeQuestions] = useState({});
	const [showForm, setShowForm] = useState(false);
	const [showButton, setShowbutton] = useState(true);
	const [refetchList, setRefetchList] = useState(false);

	const [questions, setQuestions] = useState([]);
	const { onUpdateFeedback } = useUpdateFeedbackQuestions();

	const { onSaveFeedbackQuestions, loading: saveLoading = false } = useSaveFeedbackQuestions();

	const {
		data: activeQuestionsData = {},
		loading = false,
		params,
		setParams,
		setPage,
	} = useListFeedbackQuestions({
		status     : 'active',
		department : 'technology',
		work_scope : 'Associate Software Engineer',
		showQuestion,
	});

	const { formProps, controls, apiLoading = false, onAddFeedbackQuestion } =	useAddFeedbackQuestion({ params });

	const { list: activeQuestionsList = [], total_count = '' } = activeQuestionsData || {};

	useEffect(() => {
		const newQuestionList = [];

		(activeQuestionsList || []).forEach((item) => {
			const { id, question, remark, weight, status, work_scope, department } = item;

			newQuestionList.push({
				feedback_question_id: id,
				question,
				remark,
				weight,
				status,
				department,
				work_scope,
			});
		});

		setQuestions(newQuestionList);
	}, [activeQuestionsList]);

	const {
		getValues,
		reset,
		setValue,
	} = formProps;

	const AddQuestions = (values) => {
		const finalQuestion = {
			...values,
			weight: Number(values?.weight),
		};

		onAddFeedbackQuestion({
			questions: finalQuestion,
			setRefetchList,
			reset,
			setShowForm,
			setShowbutton,
		});
	};

	const setEditFormValue = (questionData = {}) => {
		controls.forEach((control) => {
			const { name: controlName } = control;
			setValue(controlName, questionData[controlName]);
		});
	};

	const SaveQuestions = () => {
		const newQuestion = getValues();

		const finalQuestion = {
			...newQuestion,
			weight: Number(newQuestion?.weight),
		};

		const { weight } = newQuestion || {};

		if (weight < 0 || weight > 100) {
			toast.error('Enter Weightage between 1 to 100 ');
			return;
		}

		onSaveFeedbackQuestions({
			questions            : finalQuestion,
			feedback_question_id : changeQuestions.edit?.feedback_question_id,
			setQuestions,
			setChangeQuestions,
			reset,
			setShowForm,
			setShowbutton,
		});
	};

	const deleteQuestion = (deleteItemId) => {
		if (deleteItemId) {
			onUpdateFeedback({
				feedback_question_id: deleteItemId,
				setRefetchList,
			});
		}
	};

	const onCancelEdit = () => {
		setChangeQuestions((pv) => ({ ...pv, edit: undefined }));
		setShowForm(false);
		setShowbutton(true);
		reset();
	};

	const showLoading = () => (
		<div style={{ margin: '16px 0px' }}>
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
		</div>
	);

	useEffect(() => deleteQuestion(changeQuestions.delete?.feedback_question_id), [changeQuestions.delete]);

	useEffect(() => {
		if (refetchList) {
			setPage(1);
		}
		setRefetchList(false);
	}, [refetchList]);

	return (
		<div>
			<div className={styles.select_container}>
				<DepartmentSelect
					value={params.filters?.department
					|| 'technology'}
					setValue={setParams}
					type="controller"
				/>

				<RoleSelect
					value={params.filters?.work_scope || 'Associate Software Engineer'}
					department={params.filters.department || 'technology'}
					setValue={setParams}
					type="controller"
				/>
			</div>

			<div className={styles.list_actions}>
				{!changeQuestions.edit && showButton && (
					<Button
						size="md"
						themeType="accent"
						onClick={() => {
							setShowForm(true);
							setShowbutton(false);
						}}
						style={{ margin: '8px 0' }}
					>
						<IcMPlus style={{ marginRight: '4px' }} />
						Add Questions
					</Button>
				)}

				{!changeQuestions.edit && !showForm && total_count > 3 && (
					<Pagination
						type="compact"
						currentPage={params.page}
						totalItems={total_count}
						pageSize={params.page_limit}
						onPageChange={setPage}
						style={{ marginRight: '8px' }}
					/>
				)}
			</div>

			{showForm && (
				<div className={styles.question_form}>
					<CreateForm
						formProps={formProps}
						type="create_question"
						onSubmit={AddQuestions}
						loading={apiLoading}
						controls={controls}
						onCancel={() => {
							setShowForm(false);
							setShowbutton(true);
						}}
					/>
				</div>
			)}

			{loading && showLoading()}

			{questions?.length === 0 && !loading && !showForm && <EmptyState />}

			{!loading && (
				<div>
					{(questions || []).map((data) => {
						const { status = '', feedback_question_id = '' } = data || {};
						if (status === 'inactive' || !('feedback_question_id' in data)) return null;

						if (changeQuestions.edit?.feedback_question_id === data.feedback_question_id) {
							setEditFormValue(data);

							return (
								<div className={styles.question_form}>
									<CreateForm
										formProps={formProps}
										type="save_question"
										onSubmit={SaveQuestions}
										loading={saveLoading}
										controls={controls}
										onCancel={onCancelEdit}
									/>
								</div>
							);
						}
						return (
							<Questions
								item={data}
								feedbackQuestionId={feedback_question_id}
								setChangeQuestions={setChangeQuestions}
								type="current"
							/>
						);
					})}
				</div>
			)}

		</div>
	);
}

export default CurrentQuestionsTab;
