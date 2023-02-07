import { Button, Placeholder, toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import CreateForm from '../../../../common/CreateForm';
import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import RoleSelect from '../../../../common/RoleSelect';
import useAddFeedbackQuestion from '../../../../hooks/useAddFeedbackQuestion';
import useListFeedbackQuestions from '../../../../hooks/useListFeedbackQuestions';
import useSaveFeedbackQuestions from '../../../../hooks/useSaveFeedbackQuestions';
import useUpdateFeedbackQuestions from '../../../../hooks/useUpdateFeedbackQuestions';
import Questions from '../Questions';

import styles from './styles.module.css';

function CurrentQuestionsTab() {
	const [params, setParams] = useState({
		filters: {
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

	const { onSaveFeedbackQuestions } = useSaveFeedbackQuestions();

	const { formProps, controls, apiLoading, onAddFeedbackQuestion } =	useAddFeedbackQuestion({ params });

	const { data: activeQuestionsData, loading } = useListFeedbackQuestions({
		status: 'active',
		params,
		setQuestions,
	});

	const { list: activeQuestionsList } = activeQuestionsData || {};

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
	}, [activeQuestionsList?.length]);

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
		const filteredQuestions = questions.filter((item) => {
			if (
				item.feedback_question_id === deleteItemId
				&& 'feedback_question_id' in item
			) {
				onUpdateFeedback({
					feedback_question_id: item?.feedback_question_id,
				});
			}
			return item.feedback_question_id !== deleteItemId;
		});

		setQuestions(filteredQuestions);
		setConfirmDelete(false);
	}

	const onCancelEdit = () => {
		setShowForm(false);
		setShowbutton(true);
		setConfirmEdit(false);
		reset();
	};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			{' '}
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
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
					className="primary sm"
					onClick={() => {
						setShowForm(true);
						setShowbutton(false);
					}}
					style={{ margin: '8px 0' }}
				>
					Add Questions
				</Button>
			)}

			{showForm && (
				<CreateForm
					formProps={formProps}
					type="create_question"
					onSubmit={AddQuestions}
					controls={controls}
					onCancel={setShowForm}
				/>
			)}

			{loading && showLoading()}

			{questions?.length === 0 && !loading && !showForm && <EmptyState />}

			<div>
				{(questions || []).map((data) => {
					const { status = '', feedback_question_id = '' } = data || {};
					if (status === 'inactive' || !('feedback_question_id' in data)) return null;

					if (confirmEdit && editIndexId === data.feedback_question_id) {
						return (
							<CreateForm
								formProps={formProps}
								type="create_question"
								onSubmit={AddQuestions}
								controls={controls}
								onCancel={onCancelEdit}
							/>
						);
					}
					return (
						<Questions
							data={data}
							feedbackQuestionId={feedback_question_id}
							setEditIndexId={setEditIndexId}
							setDeleteItemId={setDeleteItemId}
							setConfirmDelete={setConfirmDelete}
							setEditItem={setEditItem}
							setConfirmEdit={setConfirmEdit}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default CurrentQuestionsTab;
