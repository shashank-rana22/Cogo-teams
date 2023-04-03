import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTest from '../../../../hooks/useCreateTest';

import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function DetailsAndQuestions({ setTestId, setActiveStepper, data = {}, loading: getLoading, test_id }) {
	const [showQuestionSet, setShowQuestionSet] = useState(false);

	const [idArray, setIdArray] = useState([]);

	const { control, formState:{ errors }, handleSubmit, setValue, watch } = useForm();

	const { loading, createTest } = useCreateTest({ setTestId, setActiveStepper });

	const [uploadDocument, setUploadDocument] = useState();

	const { set_data = [] } = data || {};

	const handleChange = ({ type }) => {
		// handleSubmit((values) => {
		// 	if (isEmpty(idArray)) {
		// 		Toast.error('Atleast one of the Question Sets must be selected');
		// 	} else {
		// 		createTest({ idArray, next: type === 'save_as_draft' ? 'draft' : 'criteria', uploadDocument });
		// 	}
		// })();
		createTest({ idArray, next: type === 'save_as_draft' ? 'draft' : 'criteria', uploadDocument });
	};

	useEffect(() => {
		if (!isEmpty(set_data)) {
			setShowQuestionSet(true);
			setIdArray((set_data || []).map((item) => item.id));
		}
	}, [set_data]);

	return (
		<div className={styles.container}>
			<TestDetails
				control={control}
				errors={errors}
				data={data}
				setValue={setValue}
				watch={watch}
				handleSubmit={handleSubmit}
				uploadDocument={uploadDocument}
				setUploadDocument={setUploadDocument}
			/>

			<div className={styles.btn_container}>
				{(!showQuestionSet && test_id) ? (
					<Button
						type="button"
						onClick={() => setShowQuestionSet(true)}
						size="md"
						themeType="primary"
						style={{ marginRight: '20px' }}
						loading={getLoading || loading}
					>
						From Existing Question Set
					</Button>
				) : null}

			</div>

			{showQuestionSet ? (
				<QuestionSet
					setIdArray={setIdArray}
					setShowQuestionSet={setShowQuestionSet}
					set_data={data?.set_data}
					idArray={idArray}
					watch={watch}
				/>
			) : null}

			{showQuestionSet && (
				<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
					<Button
						type="button"
						loading={loading || getLoading}
						size="md"
						themeType="secondary"
						style={{ marginRight: '10px' }}
						onClick={() => handleChange({ type: 'save_as_draft' })}
					>
						Save As Draft
					</Button>

					<Button
						type="button"
						loading={loading || getLoading}
						size="md"
						themeType="primary"
						onClick={() => handleChange({ type: 'review_and_set_validity' })}
					>
						Review And Set Validity
					</Button>
				</div>
			)}
		</div>
	);
}

export default DetailsAndQuestions;
