import { Input, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import useCreateFaqQuestion from '../../../../../../hooks/useCreateFaqQuestion';

import styles from './styles.module.css';

function EmptySearchState({ search = '' }) {
	const [searchquestion, setSearchquestion] = useState(search);
	const [show, setShow] = useState(false);
	const [questionCreated, setQuestionCreated] = useState(false);

	const { createFaqQuestion, loading } = useCreateFaqQuestion();

	useEffect(() => {
		setSearchquestion(search);
	}, [search]);

	const handleSubmit = () => {
		createFaqQuestion({
			searchState: searchquestion,
			setShow,
			setQuestionCreated,
		});
	};
	const renderQuestion = () => (
		<div className={styles.input_component}>
			<div className={styles.input_heading}>Request your question here</div>
			<Input
				size="sm"
				placeholder="Search for a question or a topic.."
				value={searchquestion}
				onChange={(val) => setSearchquestion(val)}
				disabled={loading}
			/>
			<div className={styles.button_row}>
				<Button themeType="secondary" onClick={() => setShow(false)}>
					<div className={styles.cancel}>Cancel</div>
				</Button>
				<Button
					className={styles.last_button}
					disabled={loading}
					onClick={handleSubmit}
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
					<IcCFtick height={30} width={30} className={styles.icon} />
					<div className={styles.label}>
						Your question has been successfully requested.
					</div>
				</div>
			) : (
				<div
					role="presentation"
					className={styles.request_text}
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
