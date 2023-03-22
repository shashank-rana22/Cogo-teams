import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTest from '../../../../hooks/useCreateTest';

// import NewQuestion from './components/NewQuestion';
import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function DetailsAndQuestions({ setTestId, setActiveStepper, data, loading: getLoading }) {
	const { control, formState:{ errors }, handleSubmit, setValue } = useForm();

	const { loading, createTest } = useCreateTest({ setTestId, setActiveStepper });

	const [showQuestionSet, setShowQuestionSet] = useState(false);

	// const [allKeysSaved, setAllKeysSaved] = useState(false);

	const [idArray, setIdArray] = useState([]);

	useEffect(() => {
		if (!isEmpty(data?.set_data || [])) {
			setShowQuestionSet(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<div className={styles.container}>
			<TestDetails control={control} errors={errors} data={data} setValue={setValue} />

			<div className={styles.btn_container}>
				{!showQuestionSet ? (
					<Button
						onClick={() => setShowQuestionSet(true)}
						size="md"
						themeType="primary"
						style={{ marginRight: '20px' }}
						loading={getLoading || loading}
					>
						From Existing Question Set
					</Button>
				) : null}

				{/* {allKeysSaved ? (
					<Button
						onClick={() => setAllKeysSaved(false)}
						size="md"
						themeType="accent"
					>
						+ Add New Question
					</Button>
				) : null} */}

			</div>

			{showQuestionSet ? (
				<QuestionSet
					setIdArray={setIdArray}
					setShowQuestionSet={setShowQuestionSet}
					set_data={data?.set_data}
					idArray={idArray}
				/>
			) : null}

			{/* {!allKeysSaved && <NewQuestion allKeysSaved={allKeysSaved} setAllKeysSaved={setAllKeysSaved} />} */}

			{showQuestionSet && (
				<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
					<Button
						loading={loading || getLoading}
						size="md"
						themeType="tertiary"
						style={{ marginRight: '10px' }}
						onClick={
							handleSubmit((values) => {
								createTest({ data: values, idArray, next: 'draft' });
							})
						}
					>
						Save As Draft
					</Button>

					<Button
						loading={loading || getLoading}
						size="md"
						themeType="primary"
						onClick={
							handleSubmit((values) => {
								createTest({ data: values, idArray, next: 'criteria' });
							})
						}
					>
						Review And Set Validity
					</Button>
				</div>
			)}

		</div>
	);
}

export default DetailsAndQuestions;
