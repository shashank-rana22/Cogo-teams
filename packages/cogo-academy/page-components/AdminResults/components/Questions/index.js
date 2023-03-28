import { Placeholder } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import ListHeader from './ListHeader';
import QuestionItem from './QuestionItem';
import Search from './Search/Search';
import styles from './styles.module.css';

function QuestionsComponent({ test_id }) {
	const [searchQuestion, setSearchQuestion] = useState('');
	const { debounceQuery, query } = useDebounceQuery();
	const [sortType, setSortType] = useState('');
	const [sortBy, setSortBy] = useState('');

	useEffect(() => {
		debounceQuery(searchQuestion);
	}, [debounceQuery, searchQuestion]);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_admin_question_wise_test_result',
		params : {
			test_id,
			sort_by     : sortBy,
			sort_type   : sortType,
			search_term : query,

		},
	}, { manual: false });

	const { list: questionsList = [] } = data || {};

	// if (loading) { return 'loading'; }

	return (

		<>
			<Search
				searchQuestion={searchQuestion}
				setSearchQuestion={setSearchQuestion}
			/>

			<ListHeader
				sortType={sortType}
				setSortType={setSortType}
				sortBy={sortBy}
				setSortBy={setSortBy}
			/>

			{loading ? (
				<div className={styles.placeholder_container}>
					{[1, 2, 3, 4, 5].map(() => (
						<div
							className={styles.placeholder_inner_container}
						>
							<Placeholder height="24px" />
						</div>
					))}
				</div>
			) : (questionsList || []).map((question_item, index) => (
				<QuestionItem
					key={question_item.id}
					question_item={question_item}
					index={index}
				/>
			)) }

		</>
	);
}

export default QuestionsComponent;
