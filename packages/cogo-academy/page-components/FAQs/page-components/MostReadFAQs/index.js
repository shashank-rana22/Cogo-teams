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

			{data?.list.map((question) => (
				<div className={styles.border}><Questions questions={question} /></div>
			))}
		</div>
	);
}

export default MostReadFAQs;
