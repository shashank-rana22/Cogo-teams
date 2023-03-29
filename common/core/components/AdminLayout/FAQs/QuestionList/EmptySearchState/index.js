import { Button, Input } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';
import useCreateFaqQuestion from './useCreateFaqQuestion';

function EmptySearchState({ search = '' }) {
	const [searchquestion, setSearchquestion] = useState(search);
	const [show, setShow] = useState(false);
	const [questionCreated, setQuestionCreated] = useState(false);

	const { createFaqQuestion, createQuestionloading } = useCreateFaqQuestion();

	useEffect(() => {
		setSearchquestion(search);
	}, [search]);

	const renderQuestion = () => (
		<div className={styles.input_component}>
			<div className={styles.input_heading}>Request your question here</div>
			<Input
				value={searchquestion}
				size="lg"
				style={{ marginRight: '8px', width: '100%' }}
				onChange={(e) => {
					setSearchquestion(e);
				}}
			/>
			<div className={styles.button_row}>
				<Button size="md" themeType="secondary" onClick={() => setShow(false)}>
					Cancel
				</Button>
				<Button
					disabled={createQuestionloading}
					size="md"
					themeType="primary"
					onClick={() => {
						createFaqQuestion({
							searchState: searchquestion,
							setShow,
							setQuestionCreated,
						});
					}}
					className={styles.submit_btn}
				>
					Submit
				</Button>
			</div>
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
				<div
					className={styles.request_text}
					role="presentation"
					onClick={() => setShow(true)}
				>
					Send a question request for your query.
				</div>
			)}
		</div>
	);

	return (
		<>
			<div className={styles.null_state}>
				<div className={styles.heading}>
					<div className={styles.sub_heading}>No Questions Found!</div>
					Sorry, we couldn&#39;t find any question related to your query.
				</div>
			</div>

			{show === true ? renderQuestion() : renderEmptyState()}
		</>
	);
}

export default EmptySearchState;
