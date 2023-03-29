import { Placeholder } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../CreateModule/components/EmptyState';

import ListHeader from './ListHeader';
import QuestionItem from './QuestionItem';
import Search from './Search';
import styles from './styles.module.css';

function QuestionsComponent({ test_id }) {
	const [searchQuestion, setSearchQuestion] = useState('');
	const [sortFilter, setSortFilter] = useState({});

	const { sortBy, sortType } = sortFilter || {};

	const { debounceQuery, query } = useDebounceQuery();

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
				debounceQuery={debounceQuery}
			/>

			{loading ? (
				<div className={styles.placeholder_container}>
					{Array(5).fill('').map(() => (
						<div
							className={styles.placeholder_inner_container}
						>
							<Placeholder height="24px" />
						</div>
					))}
				</div>
			) : (
				<div>
					{isEmpty(data?.list) ? <EmptyState /> : (
						<div>
							<div>
								<ListHeader
									setSortFilter={setSortFilter}
									sortFilter={sortFilter}
								/>
								{(questionsList || []).map((question_item, index) => (
									<QuestionItem
										key={question_item.id}
										question_item={question_item}
										index={index}
									/>
								))}
							</div>
						</div>
					)}

				</div>

			) }

		</>
	);
}

export default QuestionsComponent;
