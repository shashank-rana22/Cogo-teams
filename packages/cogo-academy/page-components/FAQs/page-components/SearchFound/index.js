import { Input, Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';
import useCreateQuestionSet from '../QuestionsList/hooks/useCreateQuestionRequest';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function SearchFound({ searchState }) {
	// const [show, setShow] = useState(false);
	// const [searchState, setSearchState] = useState('');
	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqQuestions(searchState);

	return data?.list.map((question) => (
		<div className={styles.border}><Questions questions={question} /></div>
	));
}

export default SearchFound;
