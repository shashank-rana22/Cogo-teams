import { ButtonIcon, Input, Button } from '@cogoport/components';
import { IcMSearchlight, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import LoadingState from '../../../../commons/LoadingState';
import SavedQuestionDetails from '../../../../commons/SavedQuestionDetails';

import BulkUpload from './BulkUpload';
import ManualAddition from './ManualAddition';
import styles from './styles.module.css';

function AddQuestionsForm({
	questionSetId,
	savedQuestionDetails,
	allKeysSaved,
	data,
	loading,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
	from,
	setFilters,
	debounceQuery,
	filters,
	listSetQuestions,
	listLoading,
	listData,
	total_count,
	page,
	setPage,
}) {
	const [showBulkUpload, setShowBulkUpload] = useState(false);

	console.log('savedQuestionDetails', savedQuestionDetails);

	const { test_questions = [], topic = '' } = data || {};

	if (isEmpty(questionSetId) && from !== 'test') {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{!isEmpty((test_questions || []).filter((item) => item.id !== editDetails?.id)) ? (
				<div className={styles.input_container}>
					<Input
						size="md"
						suffix={(
							<ButtonIcon
								size="md"
								icon={<IcMSearchlight />}
								disabled={false}
								themeType="primary"
							/>
						)}
						placeholder="Search for Question/topic"
						onChange={(val) => {
							debounceQuery(val);
							setFilters((prev) => ({ ...prev, q: val }));
						}}
						value={filters?.q}
					/>
				</div>
			) : null}

			{loading ? (
				<LoadingState />
			) : (
				!isEmpty((test_questions || []).filter((item) => item.id !== editDetails?.id)) && (
					<SavedQuestionDetails
						test_questions={listData}
						editDetails={editDetails}
						setEditDetails={setEditDetails}
						allKeysSaved={allKeysSaved}
						setAllKeysSaved={setAllKeysSaved}
						questionSetId={questionSetId}
						getTestQuestionTest={listSetQuestions}
						loading={listLoading}
						total_count={total_count}
						page={page}
						setPage={setPage}
					/>
				)
			)}

			{!allKeysSaved && !loading ? (
				<ManualAddition
					questionSetId={questionSetId}
					test_questions={test_questions}
					setSavedQuestionDetails={setSavedQuestionDetails}
					setAllKeysSaved={setAllKeysSaved}
					editDetails={editDetails}
					setEditDetails={setEditDetails}
					topic={topic}
					savedQuestionDetails={savedQuestionDetails}
					listSetQuestions={listSetQuestions}
				/>
			) : null}

			{showBulkUpload && !loading ? (
				<BulkUpload
					questionSetId={questionSetId}
					setShowBulkUpload={setShowBulkUpload}
					listSetQuestions={listSetQuestions}
				/>
			) : null}

			{from !== 'test' ? (
				<div className={styles.add_container}>
					<div>Add more Questions</div>

					<div className={styles.button_container}>
						<Button
							type="button"
							disabled={showBulkUpload}
							loading={loading}
							themeType="primary"
							style={{ marginRight: '12px' }}
							onClick={() => setShowBulkUpload(true)}
						>
							<div className={styles.upload_icon}>
								<IcMUpload />
								Bulk Upload
							</div>
						</Button>

						<Button
							type="button"
							disabled={!allKeysSaved}
							loading={loading}
							themeType="secondary"
							onClick={() => {
								setSavedQuestionDetails((prev) => [...prev, { id: new Date().getTime(), isNew: true }]);
								setAllKeysSaved(false);
							}}
						>
							+ Manual Addition
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default AddQuestionsForm;
