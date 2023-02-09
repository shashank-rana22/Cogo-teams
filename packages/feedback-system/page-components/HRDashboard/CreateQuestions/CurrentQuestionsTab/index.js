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

function CurrentQuestionsTab() {
	const [params, setParams] = useState({
		page       : 1,
		page_limit : 3,
		filters    : {
			department : 'technology',
			work_scope : 'Associate Software Engineer',
		},
	});

	const [deleteItemId, setDeleteItemId] = useState('');
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [editItem, setEditItem] = useState({});
	const [confirmEdit, setConfirmEdit] = useState(false);
	const [editIndexId, setEditIndexId] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [showButton, setShowbutton] = useState(true);

	const [questions, setQuestions] = useState([]);

	const { onUpdateFeedback } = useUpdateFeedbackQuestions();

	const { onSaveFeedbackQuestions, loading: saveLoading = false } = useSaveFeedbackQuestions();

	const { formProps, controls, apiLoading = false, onAddFeedbackQuestion } =	useAddFeedbackQuestion({ params });

	const { data: activeQuestionsData, loading, getQuestionList } = useListFeedbackQuestions({
		status: 'active',
		params,
		setQuestions,
	});

	const { list: activeQuestionsList = [], total_count = '' } = activeQuestionsData || {};
	const setPage = (p) => { setParams({ ...params, page: p }); };

	useEffect(() => setQuestions([]), [params]);
	useEffect(() => setPage(1), [params.filters]);

	useEffect(() => {
		(activeQuestionsList || []).forEach((item) => {
			const { id, question, remark, weight, status, work_scope, department } = item;
			setQuestions((pv) => [
				...pv,
				{
					feedback_question_id: id,
					question,
					remark,
					weight,
					status,
					department,
					work_scope,
				},
			]);
		});
	}, [activeQuestionsList]);

	const {
		getValues,
		reset,
	} = formProps;

	const AddQuestions = (values) => {
		const finalQuestion = {
			...values,
			weight: Number(values?.weight),
		};

		onAddFeedbackQuestion({
			questions: finalQuestion,
			setQuestions,
			reset,
			setShowForm,
			setShowbutton,
		});
	};

	const SaveQuestions = () => {
		const newQuestion = getValues();

		const finalQuestion = {
			...newQuestion,
			weight: Number(newQuestion?.weight),
		};

		const { question, remark, weight } = newQuestion || {};

		if (question === '' || remark === '' || weight === '') {
			toast.error('Please fill all the details');
			return;
		}

		if (weight < 0 || weight > 100) {
			toast.error('Enter Weightage between 1 to 100 ');
			return;
		}

		onSaveFeedbackQuestions({
			questions            : finalQuestion,
			feedback_question_id : editIndexId,
			setQuestions,
			setConfirmEdit,
			reset,
			setShowForm,
			setShowbutton,
		});
	};

	if (confirmDelete) {
		questions.forEach((item) => {
			if (
				item.feedback_question_id === deleteItemId
				&& 'feedback_question_id' in item
			) {
				onUpdateFeedback({
					feedback_question_id: item?.feedback_question_id,
				});
			}
		});
		setQuestions([]);
		getQuestionList();
		setConfirmDelete(false);
	}

	const onCancelEdit = () => {
		setShowForm(false);
		setShowbutton(true);
		setConfirmEdit(false);
		reset();
	};

	const showLoading = () => (
		<div style={{ margin: '16px 0px' }}>
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
		</div>
	);

	return (
		<div className={styles.form_container}>
			<div className={styles.select_container}>
				<DepartmentSelect value={params.filters?.department} setValue={setParams} type="controller" />

				<RoleSelect
					value={params.filters?.work_scope}
					department={params.filters.department}
					setValue={setParams}
					type="controller"
				/>
			</div>

			{showButton && (
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

			{showForm && (
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
			)}

			{loading && showLoading()}

			{questions?.length === 0 && !loading && !showForm && <EmptyState />}

			<div>
				{!confirmEdit && total_count > 3 && (
					<div className={styles.pagination}>
						<Pagination
							type="compact"
							currentPage={params.page}
							totalItems={total_count}
							pageSize={params.page_limit}
							onPageChange={setPage}
							style={{ marginRight: '8px' }}
						/>
					</div>
				)}

				{(questions || []).map((data) => {
					const { status = '', feedback_question_id = '' } = data || {};
					if (status === 'inactive' || !('feedback_question_id' in data)) return null;

					if (confirmEdit && editIndexId === data.feedback_question_id) {
						return (
							<CreateForm
								formProps={formProps}
								type="create_question"
								onSubmit={AddQuestions}
								loading={saveLoading}
								controls={controls}
								onCancel={onCancelEdit}
							/>
						);
					}
					return (
						<Questions
							item={data}
							feedbackQuestionId={feedback_question_id}
							setEditIndexId={setEditIndexId}
							setDeleteItemId={setDeleteItemId}
							setConfirmDelete={setConfirmDelete}
							setEditItem={setEditItem}
							setConfirmEdit={setConfirmEdit}
							type="current"
						/>
					);
				})}
			</div>
		</div>
	);
}

export default CurrentQuestionsTab;
