import { Input, Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';
import useCreateQuestionSet from '../QuestionsList/hooks/useCreateQuestionRequest';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function MostReadFAQs() {
	// const [show, setShow] = useState(false);

	const [searchState, setSearchState] = useState('');
	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqQuestions();

	// const { createQuestionSet, createQuestionLoading } = useCreateQuestionSet();

	// useEffect(() => {
	// 	setSearchquestion(searchState);
	// }, [searchState]);

	return (
		<div>
			<br />
			<SearchInput
				value={searchState}
				onChange={(val) => setSearchState(val)}
				size="md"
				placeholder="Search for a keyword or a question"
			/>
			<br />
			<h1 className={styles.title}>
				{startCase('Most Read FAQS')}
			</h1>
			{/* <div style={{ margin: '5px 0', width: '100%', height: '462px' }} className={styles.scrollable}>
				{(!data) ? (
					<div className={styles.nullstate}>
						<div className={styles.nullstate_heading}>
							OOPS! No Question Available
						</div>

						<div className={styles.nullstate_btn}>
							<Button onClick={() => { setShow(true); }} size="lg">
								Ask your Question
							</Button>
						</div>

					</div>
				) :  */}
			{data?.list.map((question) => (
				<div className={styles.border}><Questions questions={question} /></div>
			))}
			{/* </div> */}

			{/* <div style={{ padding: '20px' }}>

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
			</div> */}

		</div>
	);
}

export default MostReadFAQs;
