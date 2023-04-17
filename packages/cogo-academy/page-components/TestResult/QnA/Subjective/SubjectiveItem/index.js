import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import downloadFile from '../utils/downloadFile';

import FileItem from './FileItem';
import MarksComponent from './MarksComponent';
import styles from './styles.module.css';
import useAssignMarks from './useAssignMarks';

function SubjectiveItem({ data, index, view, user_id, test_id }) {
	const { question_data = {}, answers: { answer_text = '' }, assign_marks = 0, user_answers = {} } = data;

	const [value, setValue] = useState(assign_marks);
	const [error, setError] = useState('');

	const { id: question_id = '', question = '' } = question_data;

	const { answer_text: user_answer = '', file_url = '' } = user_answers || {};

	const { loading, handleAssignMarks } = useAssignMarks({ setError });

	const handleOnSubmit = () => {
		handleAssignMarks({ test_id, user_id, test_question_id: question_id, marks: value });
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
				<div className={styles.answer_outer_container}>

					{isEmpty(user_answers) || user_answer === '<p><br></p>' ? (
						<div className={styles.not_attempted}>
							{view === 'admin' ? 'User' : 'You'}
							{' '}
							didn&apos;t attempt this question
						</div>
					) : (
						<div>
							{file_url ? (
								<div className={styles.download_file_container}>
									<Button
										size="md"
										themeType="linkUi"
										onClick={() => downloadFile(file_url)}
										className={styles.download_button}
									>
										<IcMDownload className={styles.download_icon} />
										Download Attached Document
									</Button>

									<FileItem name={file_url} />
								</div>
							) : (
								<div className={styles.answer_text}>
									<div dangerouslySetInnerHTML={{ __html: user_answer }} />
								</div>
							)}
						</div>
					)}

					<MarksComponent
						view={view}
						value={value}
						setValue={setValue}
						loading={loading}
						handleOnSubmit={handleOnSubmit}
						assign_marks={assign_marks}
						error={error}
						setError={setError}
					/>
				</div>

				{answer_text ? (
					<div className={styles.explanation}>
						<strong>Answer:</strong>
						{' '}
						<div dangerouslySetInnerHTML={{ __html: answer_text }} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default SubjectiveItem;
