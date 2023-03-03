import { Input, Modal, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import useCreateQuestionSet
	from '../../page-components/FAQs/page-components/Tabbase/QuestionsList/hooks/useCreateQuestionRequest';

import styles from './styles.module.css';

function EmptyQuestionListState({ searchState = '' }) {
	const [searchquestion, setSearchquestion] = useState(searchState);
	const [questionCreated, setQuestionCreated] = useState(false);

	useEffect(() => {
		setSearchquestion(searchState);
	}, [searchState]);

	const [show, setShow] = useState(false);

	const { createQuestionSet, createQuestionLoading } = useCreateQuestionSet();

	return (
		<div className={styles.nullstate}>
			<div className={styles.nullstate_heading}>
				<div style={{ fontSize: '24px' }}>
					Oops!
				</div>
				{' '}
				<br />
				<div style={{ fontSize: '18px', marginTop: '-16px' }}>
					Sorry, we couldn’t find any question related to your query.
				</div>
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
								onClick={() => {
									setShow(true);
								}}
								className={styles.ask_question_text}
							>
								Send a question request for your query.
							</div>
						)}

					</div>
				</div>
			</div>

			<Modal size="md" show={show} onClose={() => setShow(false)} placement="top">
				<Modal.Header title="Request your question here" />
				<Modal.Body>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Input
							value={searchquestion}
							size="lg"
							style={{ marginRight: '8px', width: '100%' }}
							onChange={(value) => { setSearchquestion(value); }}
						/>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button
						loading={createQuestionLoading}
						onClick={() => {
							createQuestionSet({
								searchState: searchquestion,
								setShow,
								setQuestionCreated,
							});
						}}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}
export default EmptyQuestionListState;
