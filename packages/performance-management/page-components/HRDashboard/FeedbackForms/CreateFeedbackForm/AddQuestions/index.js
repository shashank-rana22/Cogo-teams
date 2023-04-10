import { Placeholder, Pagination, Modal, Input, Button } from '@cogoport/components';
import { useDebounceQuery, useForm, CreatableMultiSelectController } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFeedbackQuestions from '../../../../../hooks/useListFeedbackQuestions';
import getTagControls from '../../../../../utils/getTagControls';
import BulkDesignation from '../../BulkDesignation';
import Questions from '../../Questions';

import CreateQuestions from './CreateQuestions';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function AddQuestions({
	formId = '', proceedForm = () => {}, questionActionList = {},
	setQuestionActionList = () => {},
	formsParams = {},
	setFormsParams = () => {},
}) {
	const { department, designation, bulkDesignations:localBulkDesignations = [] } = formsParams;

	const [addAnother, setAddAnother] = useState(false);
	const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
	const [refetchList, setRefetchList] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [bulkDesignations, setBulkDesignations] = useState(!isEmpty(localBulkDesignations)
		? localBulkDesignations : [designation]);
	const [openBulkDesignation, setOpenBulkDesignation] = useState(false);

	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		data = {}, loading = false, params, setParams, refetchQuestions = () => {},
		setPage,
	} = useListFeedbackQuestions({
		searchValue: query,
		formId,
	});
	const {
		pagination_data = {},
	} = data;

	const { total_count = '' } = pagination_data;

	const tagControls = getTagControls();
	const { control, watch } = useForm();

	const tags = watch('tags');

	useEffect(() => {
		if (!isEmpty(data)) {
			const {	list: questions = [], form_questions: checkedQuestions = [] } = data;

			setQuestionActionList((pv) => ({
				...pv,
				allList: questions,

				checked: isEmpty(pv.checked) ? checkedQuestions : pv.checked,
			}));
		}
	}, [data, setQuestionActionList]);

	useEffect(() => debounceQuery(searchValue), [debounceQuery, searchValue]);

	useEffect(() => setParams((pv) => ({
		...pv,
		Tags: (
			tags || []).join(',') || undefined,
		Page: 1,
	})), [setParams, tags]);

	useEffect(() => {
		if (refetchList) {
			refetchQuestions({ Page: 1 });
		}
		setRefetchList(false);
	}, [refetchList, refetchQuestions]);

	const showLoading = () => (
		<div className={styles.questions}>
			{[1, 2, 3, 4, 5, 6].map((i) => (
				<Placeholder
					height="80px"
					margin="0 0 8px 0"
					key={i}
				/>
			))}
		</div>
	);

	const areFiltersApplied = params.Tags || params.Q;
	const currentDesignation = bulkDesignations.length > 1 ? '...' : designation;

	useEffect(() => {
		setFormsParams((pv) => ({ ...pv, bulkDesignations }));
	}, [bulkDesignations, setFormsParams]);

	return (
		<>
			{isEmpty(questionActionList?.allList) && !areFiltersApplied && !loading
				? <EmptyState setOpenNewQuestionModal={setOpenNewQuestionModal} /> : (

					<div className={styles.add_question_container}>
						<div className={styles.header}>
							<div className={styles.form_header}>
								Create Form :
								{' '}
								<div className={styles.dep}>
									{startCase(department || '---')}
									{' > '}
								</div>

								<div
									role="button"
									tabIndex={0}
									className={styles.role}
									onClick={() => setOpenBulkDesignation(true)}
								>
									{currentDesignation}
								</div>
							</div>

							<Button themeType="tertiary" onClick={() => setOpenNewQuestionModal(true)}>
								<IcMPlus />
								New Question
							</Button>
						</div>

						<div className={styles.body}>
							<div className={styles.info_text}>Select A Question To Add...</div>

							<div className={styles.filters_pagination}>
								<div className={styles.filters}>
									<CreatableMultiSelectController
										control={control}
										{...tagControls}
									/>
									<Input
										value={searchValue}
										onChange={setSearchValue}
										style={{ marginLeft: '8px' }}
										placeholder="Search Question..."
									/>

								</div>

								{total_count > params.PageLimit && (
									<div className={styles.pagination_container}>
										<Pagination
											type="number"
											currentPage={params.Page}
											totalItems={total_count}
											pageSize={params.PageLimit}
											onPageChange={setPage}
										/>
									</div>
								)}

							</div>

							<div className={styles.questions}>
								{loading ? showLoading() : (
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
								themeType="primary"
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

			{openBulkDesignation && (
				<Modal
					show={openBulkDesignation}
					onClose={() => {
						setOpenBulkDesignation(false);
					}}
				>
					<Modal.Header title="Bulk Create for Designations" />

					<Modal.Body style={{ padding: '0px' }}>
						<BulkDesignation
							setOpenBulkDesignation={setOpenBulkDesignation}
							setBulkDesignations={setBulkDesignations}
							department={department}
							designation={designation}
							bulkDesignations={bulkDesignations}
						/>
					</Modal.Body>
				</Modal>
			)}
		</>

	);
}

export default AddQuestions;
