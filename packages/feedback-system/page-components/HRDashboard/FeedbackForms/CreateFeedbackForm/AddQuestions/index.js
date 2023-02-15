import { Pagination, Modal, Input, CreatableMultiSelect, Button } from '@cogoport/components';
import { Controller, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFeedbackQuestions from '../../../../../hooks/useListFeedbackQuestions';
import getTagControls from '../../../../../utils/getTagControls';
import Questions from '../../Questions';

import CreateQuestions from './CreateQuestions';
import styles from './styles.module.css';

function AddQuestions({
	formId = '', proceedForm = () => {}, questionActionList = {},
	setQuestionActionList = () => {},
}) {
	const [addAnother, setAddAnother] = useState(false);
	const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
	const [refetchList, setRefetchList] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { query = '', debounceQuery } = useDebounceQuery();

	const { data = {}, params, setParams, getQuestionList, setPage } = useListFeedbackQuestions({
		showQuestion : true,
		searchValue  : query,
		formId,
	});
	const { list: questions = [], total_count = '', page_limit = '', page = '' } = data || {};

	const { name, rules, ...rest } = getTagControls();
	const { control, watch } = useForm();

	const tags = watch('tags');

	useEffect(() => {
		const newQuestions = [];

		questions.forEach((question) => {
			newQuestions.push(question);
		});

		if (!isEmpty(newQuestions)) {
			if (formId) {
				setQuestionActionList({
					...questionActionList,
					checked : [...(questionActionList.checked || []), ...newQuestions],
					allList : newQuestions,
				});
				return;
			}

			setQuestionActionList({
				...questionActionList,
				checked : [...(questionActionList.checked || [])],
				allList : newQuestions,
			});
		}
	}, [questions]);

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	useEffect(() => setParams({ ...params, filters: { ...(params.filters || {}), tags: tags || undefined } }), [tags]);

	useEffect(() => {
		if (refetchList) {
			getQuestionList();
		}
		setRefetchList(false);
	}, [refetchList]);

	return (
		<div className={styles.add_question_container}>
			<div className={styles.header}>
				<div className={styles.form_header}>Create Form</div>
				<div className={styles.new_button}>
					<Button onClick={() => setOpenNewQuestionModal(true)}>
						<IcMPlus />
						New Question
					</Button>
				</div>
			</div>

			<div>Select A Question To Add...</div>

			<div className={styles.filters}>
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field: { onChange, onBlur, value } }) => (
						<CreatableMultiSelect
							{...rest}
							name={name}
							onChange={onChange}
							value={value}
							onBlur={onBlur}
						/>
					)}
				/>
				<Input value={searchValue} onChange={setSearchValue} style={{ marginLeft: '8px' }} />
			</div>

			{questionActionList.allList?.length > 0 && (
				<Questions
					questions={questionActionList.allList}
					questionActionList={questionActionList}
					setQuestionActionList={setQuestionActionList}
				/>
			)}

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>

			{openNewQuestionModal && (
				<Modal
					show={openNewQuestionModal}
					onClickOutside={() => {
						setAddAnother(false);
						setOpenNewQuestionModal(false);
					}}
					onClose={() => {
						setAddAnother(false);
						setOpenNewQuestionModal(false);
					}}
				>
					<Modal.Header title="Create Question" />

					<div className={styles.modal_body}>
						<Modal.Body>
							<CreateQuestions
								setOpenNewQuestionModal={setOpenNewQuestionModal}
								addAnother={addAnother}
								setAddAnother={setAddAnother}
							/>
						</Modal.Body>
					</div>
				</Modal>
			)}

			<div className={styles.footer}>
				<Button
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={() => proceedForm('cancel')}
				>
					Cancel

				</Button>
				<Button themeType="accent" onClick={() => proceedForm('submit_form')}>Add to Form</Button>
			</div>
		</div>
	);
}

export default AddQuestions;
