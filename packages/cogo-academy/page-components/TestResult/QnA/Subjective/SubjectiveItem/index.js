import { Pill, Input, Button, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import React, { useState } from 'react';

import styles from './styles.module.css';

function SubjectiveItem({ data, index, view, user_id, test_id }) {
	const { question_data = {}, answers = [], assign_marks = 0 } = data;

	const [value, setValue] = useState(assign_marks);

	const { explanation = [], id:question_id = '', question = '' } = question_data;

	const { answer_text = '' } = answers;

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_test_user_question_response',
	}, { manual: true });

	const handleAssignMarks = async () => {
		try {
			const res = await trigger({
				data: {
					test_id,
					user_id,
					test_question_id : question_id,
					marks            : value,
					question_type    : 'subjective',
				},
			});

			if (res) {
				Toast.success('Marks Assigned Successfully');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.question_heading}>
				<div className={styles.question_text}>
					Q
					{index}
					{'  '}
					{question}
				</div>

				<div className={styles.question_type}>Subjective Question</div>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.answer_container}>
					<div className={styles.answer_text}>
						<div dangerouslySetInnerHTML={{ __html: answer_text }} />
					</div>

					{view === 'admin' ? (
						<div className={styles.marks_container}>
							<div className={styles.text}>
								Assign Marks
								<sup style={{ color: '#EE3425' }}>*</sup>
							</div>

							<div className={styles.input_container}>
								<Input
									name="asign_marks"
									value={value}
									onChange={(e) => setValue(e)}
									placeholder="out of 10"
								/>

								<Button
									type="button"
									size="md"
									themeType="tertiary"
									disabled={loading}
									onClick={handleAssignMarks}
								>
									<strong>Save</strong>
								</Button>
							</div>
						</div>
					) : (
						<div className={styles.marks_container}>
							<div className={styles.text}>Marks Obtained</div>
							<Pill size="lg" color="green"><strong>{`${assign_marks || 0}/10`}</strong></Pill>
						</div>
					)}

				</div>

				{explanation?.[0] ? (
					<div className={styles.explanation}>
						<strong>Answer:</strong>
						{' '}
						<div dangerouslySetInnerHTML={{ __html: explanation?.[0] }} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default SubjectiveItem;
