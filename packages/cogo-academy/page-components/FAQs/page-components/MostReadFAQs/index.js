import { Input, Modal, Button, Pagination } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Spinner from '../../../../commons/Spinner';
import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';
import useCreateQuestionSet from '../QuestionsList/hooks/useCreateQuestionRequest';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function MostReadFAQs() {
	// const [show, setShow] = useState(false);

	const [searchState, setSearchState] = useState('');
	const sort = true;
	const {
		page,
		setPage = () => {},
		paginationData,
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqQuestions({ searchState, sort });

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					outerBorderColor="#FFF"
					spinBorderColor="#000"
					borderWidth="7px"
				/>
			</div>
		);
	}

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
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={paginationData?.total_count}
					pageSize={paginationData?.page_limit}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}

export default MostReadFAQs;
