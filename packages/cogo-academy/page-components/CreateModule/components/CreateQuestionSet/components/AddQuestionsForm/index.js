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
	getTestQuestionTest,
	setSavedQuestionDetails,
	setAllKeysSaved,
	editDetails,
	setEditDetails,
	from,
	setFilters,
	filters,
}) {
	const [showBulkUpload, setShowBulkUpload] = useState(false);

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
						onChange={(val) => setFilters((prev) => ({ ...prev, q: val }))}
						value={filters?.q}
					/>
				</div>
			) : null}

			{loading ? (
				<LoadingState />
			) : (
				!isEmpty((test_questions || []).filter((item) => item.id !== editDetails?.id)) && (
					<SavedQuestionDetails
						savedQuestionDetails={savedQuestionDetails}
						test_questions={test_questions}
						editDetails={editDetails}
						setEditDetails={setEditDetails}
						allKeysSaved={allKeysSaved}
						setAllKeysSaved={setAllKeysSaved}
						questionSetId={questionSetId}
						getTestQuestionTest={getTestQuestionTest}
					/>
				)
			)}

			{!allKeysSaved && !loading ? (
				<ManualAddition
					questionSetId={questionSetId}
					test_questions={test_questions}
					getTestQuestionTest={getTestQuestionTest}
					setSavedQuestionDetails={setSavedQuestionDetails}
					setAllKeysSaved={setAllKeysSaved}
					editDetails={editDetails}
					setEditDetails={setEditDetails}
					topic={topic}
					savedQuestionDetails={savedQuestionDetails}
				/>
			) : null}

			{showBulkUpload && !loading ? (
				<BulkUpload
					questionSetId={questionSetId}
					setShowBulkUpload={setShowBulkUpload}
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
