import { Pagination, Modal, Input, CreatableMultiSelect, Button } from '@cogoport/components';
import { Controller, useDebounceQuery, useForm } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFeedbackQuestions from '../../../../../hooks/useListFeedbackQuestions';
import getTagControls from '../../../../../utils/getTagControls';
import Questions from '../../Questions';

import CreateQuestions from './CreateQuestions';
import EmptyState from './EmptyState';
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
		searchValue: query,
		formId,
	});
	const {
		list: questions = [], form_questions: checkedQuestions = [],
		pagination_data = {},
	} = data || {};

	const { total_count = '' } = pagination_data;

	const { name, rules, ...rest } = getTagControls();
	const { control, watch } = useForm();

	const tags = watch('tags');

	useEffect(() => {
		if (!isEmpty(data)) {
			setQuestionActionList({
				...questionActionList,
				allList: questions,

				checked: questionActionList.checked || checkedQuestions,
			});
		}
	}, [data]);

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	useEffect(() => setParams({ ...params, filters: { ...(params.filters || {}), tags: tags || undefined } }), [tags]);

	useEffect(() => {
		if (refetchList) {
			getQuestionList();
		}
		setRefetchList(false);
	}, [refetchList]);

	return (
		<>
			{isEmpty(questionActionList?.allList)
				? <EmptyState setOpenNewQuestionModal={setOpenNewQuestionModal} /> : (
					<div className={styles.add_question_container}>
						<div className={styles.header}>
							<div className={styles.form_header}>Create Form</div>

							<Button themeType="secondary" onClick={() => setOpenNewQuestionModal(true)}>
								<IcMPlus />
								New Question
							</Button>
						</div>

						<div className={styles.body}>
							<div className={styles.info_text}>Select A Question To Add...</div>

							<div className={styles.filters_pagination}>
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
									<Input
										value={searchValue}
										onChange={setSearchValue}
										style={{ marginLeft: '8px' }}
										placeholder="Search Question..."
									/>

								</div>

								<div className={styles.pagination_container}>
									<Pagination
										type="number"
										currentPage={params.page}
										totalItems={total_count}
										pageSize={params.page_limit}
										onPageChange={setPage}
									/>
								</div>
							</div>

							<div className={styles.questions}>
								{questionActionList?.allList.length > 0 && (
									<Questions
										questions={questionActionList?.allList}
										questionActionList={questionActionList}
										setQuestionActionList={setQuestionActionList}
									/>
								)}
							</div>

						</div>

						<div className={styles.footer}>
							<Button
								themeType="tertiary"
								style={{ marginRight: '8px' }}
								onClick={() => proceedForm('')}
							>
								Cancel

							</Button>

							<Button
								themeType="accent"
								onClick={() => proceedForm('submit_form')}
							>
								Add to Form

							</Button>
						</div>
					</div>
				)}

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
								setRefetchList={setRefetchList}
							/>
						</Modal.Body>
					</div>
				</Modal>
			)}
		</>

	);
}

export default AddQuestions;
