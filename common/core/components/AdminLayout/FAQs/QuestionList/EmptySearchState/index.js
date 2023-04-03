import { IcCFtick } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import RequestForm from './RequestQuestion';
import styles from './styles.module.css';

function EmptySearchState({ search = '', source = 'empty_state' }) {
	const [searchQuestion, setSearchQuestion] = useState(search);
	const [show, setShow] = useState(false);
	const [questionCreated, setQuestionCreated] = useState(false);
	const [answer, setAnswer] = useState('');

	useEffect(() => {
		setSearchQuestion(search);
	}, [search]);

	const renderQuestion = () => (
		<RequestForm
			searchQuestion={searchQuestion}
			setSearchQuestion={setSearchQuestion}
			answer={answer}
			setAnswer={setAnswer}
			setShow={setShow}
			setQuestionCreated={setQuestionCreated}
		/>
	);

	const renderEmptyText = () => (
		<div className={styles.null_state}>
			{source !== 'list' && (
				<div className={styles.heading}>
					<div className={styles.sub_heading}>No Questions Found!</div>
					Sorry, we couldn&#39;t find any question related to your query.
				</div>
			)}

		</div>
	);

	const renderEmptyState = () => (
		<div className={styles.request_question}>
			{questionCreated === true ? (
				<div className={styles.updated_text}>
					{' '}
					<IcCFtick height={20} width={20} />
					<span style={{ marginLeft: '4px' }}>
						Your question has been successfully requested.
					</span>
				</div>
			) : (
				<div>
					{renderEmptyText()}
					<div
						className={styles.request_text}
						role="presentation"
						onClick={() => setShow(true)}
					>
						Send a question request for your query
					</div>
				</div>

			)}
		</div>
	);

	return (
		show === true ? renderQuestion() : renderEmptyState()

	);
}

export default EmptySearchState;
