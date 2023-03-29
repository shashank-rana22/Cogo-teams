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
	const [sortFilter, setSortFilter] = useState({});

	const { sortBy, sortType } = sortFilter || {};

	const { debounceQuery, query } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchQuestion);
	}, [debounceQuery, searchQuestion]);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/get_admin_question_wise_test_result',
		params : {
			test_id,
			search_term : query,
			sort_type   : sortType,
			sort_by     : sortBy,
		},
	}, { manual: false });

	const { list: questionsList = [] } = data || {};

	return (

		<>
			<Search
				searchQuestion={searchQuestion}
				setSearchQuestion={setSearchQuestion}
			/>

			<ListHeader
				setSortFilter={setSortFilter}
				sortFilter={sortFilter}
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
