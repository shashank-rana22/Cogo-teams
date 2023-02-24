import { Input, Modal, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useCreateQuestionSet
	from '../../page-components/FAQs/page-components/QuestionsList/hooks/useCreateQuestionRequest';

import styles from './styles.module.css';

function EmptyQuestionListState({
	searchquestion = '',
	setSearchquestion = () => {},
	searchState = '',
}) {
	const [show, setShow] = useState(false);

	const { createQuestionSet, createQuestionLoading } = useCreateQuestionSet();

	useEffect(() => {
		setSearchquestion(searchState);
	}, [searchState, setSearchquestion]);

	return (
		<div className={styles.nullstate}>
			<div className={styles.nullstate_heading}>
				OOPS! No Question Available
			</div>

			<div className={styles.nullstate_btn}>
				<Button onClick={() => { setShow(true); }} size="lg">
					Request your Question
				</Button>
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
						onClick={() => { createQuestionSet({ searchState: searchquestion, setShow }); }}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}
export default EmptyQuestionListState;
