import { Placeholder, Pagination, Modal, Input, Button } from '@cogoport/components';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import CreatableMultiSelectController from '@cogoport/forms/page-components/Controlled/CreatableMultiSelectController';
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
		data = {}, loading = false, params, setParams, trigger: refetchQuestions = () => {},
		setPage,
	} = useListFeedbackQuestions({
		searchValue: query,
		formId,
	});
	const {
		list: questions = [], form_questions: checkedQuestions = [],
		pagination_data = {},
	} = data;

	const { total_count = '' } = pagination_data;

	const tagControls = getTagControls();
	const { control, watch } = useForm();

	const tags = watch('tags');

	useEffect(() => {
		if (!isEmpty(data)) {
			setQuestionActionList({
				...questionActionList,
				allList: questions,

				checked: isEmpty(questionActionList.checked) ? checkedQuestions : questionActionList.checked,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => debounceQuery(searchValue), [searchValue]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setParams({ ...params, Tags: (tags || []).join(',') || undefined, Page: 1 }), [tags]);

	useEffect(() => {
		if (refetchList) {
			refetchQuestions({ params: { ...params, Page: 1 } });
		}
		setRefetchList(false);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refetchList]);

	const showLoading = () => (
		<div className={styles.questions}>
			{Array(6).fill('').map((index) => (
				<Placeholder
					height="80px"
					margin="0 0 8px 0"
					key={index}
				/>
			))}
		</div>
	);

	const areFiltersApplied = params.Tags || params.Q;
	const currentDesignation = bulkDesignations.length > 1 ? '...' : designation;

	useEffect(() => {
		setFormsParams((pv) => ({ ...pv, bulkDesignations }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bulkDesignations]);

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
									{startCase(department)}
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
