import { Toast, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateTest from '../../../../hooks/useCreateTest';

import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function DetailsAndQuestions({ setTestId, setActiveStepper, data, loading: getLoading }) {
	const [showQuestionSet, setShowQuestionSet] = useState(false);

	const [idArray, setIdArray] = useState([]);

	const { control, formState:{ errors }, handleSubmit, setValue, watch } = useForm();

	const { loading, createTest } = useCreateTest({ setTestId, setActiveStepper });

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
						themeType="tertiary"
						style={{ marginRight: '10px' }}
						onClick={
							handleSubmit((values) => {
								if (idArray.length === 0) {
									Toast.error('Atleast one of the Question Sets must be selected');
								} else {
									createTest({ data: values, idArray, next: 'draft' });
								}
							})
						}
					>
						Save As Draft
					</Button>

					<Button
						type="button"
						loading={loading || getLoading}
						size="md"
						themeType="primary"
						onClick={
							handleSubmit((values) => {
								if (idArray.length === 0) {
									Toast.error('Atleast one of the Question Sets must be selected');
								} else {
									createTest({ data: values, idArray, next: 'criteria' });
								}
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
