import { IcCFtick } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import RequestForm from './RequestQAForm';
import styles from './styles.module.css';

function EmptyQuestionListState({ searchState = '', source = 'empty_state' }) {
	const [searchquestion, setSearchquestion] = useState(searchState);
	const [questionCreated, setQuestionCreated] = useState(false);
	const [answer, setAnswer] = useState('');
	const [show, setShow] = useState(false);

	useEffect(() => {
		setSearchquestion(searchState);
	}, [searchState]);

	const renderEmptyState = () => (
		<div className={styles.nullstate_heading}>
			{source !== 'list'
				&& (
					<div>
						<div className={styles.text_wrapper}>
							Oops!
						</div>

						<div>
							Sorry, we couldn’t find any question related to your query.
						</div>
					</div>
				)}

			<div className={styles.nullstate_btn}>
				<div
					className={styles.request_question}
					size="md"
				>
					{questionCreated === true ? (
						<div className={styles.question_updated_text}>
							<IcCFtick height={20} width={20} />
							<span style={{ marginLeft: '4px' }}>
								Your question has been successfully requested.
							</span>

						</div>
					) : (
						<div
							role="presentation"
							onClick={() => setShow(true)}
							className={styles.ask_question_text}
							style={{ paddingLeft: source === 'list' ? '24px' : '0px' }}

						>
							Request or Submit an answer
						</div>
					)}

				</div>
			</div>
		</div>

	);

	return (
		<div className={styles.nullstate}>
			{!show ? renderEmptyState()
				: (
					<RequestForm
						searchquestion={searchquestion}
						setSearchquestion={setSearchquestion}
						answer={answer}
						setAnswer={setAnswer}
						setShow={setShow}
						setQuestionCreated={setQuestionCreated}
						source={source}

					/>
				)}

		</div>
	);
}
export default EmptyQuestionListState;
