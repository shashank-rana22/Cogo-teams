import { isEmpty, format } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import Loader from '../../Loader';
import useUpdateFaqSearchHistory from '../hooks/useUpdateFaqSearchHistory';

import styles from './styles.module.css';

function SearchHistoryList({
	setShowHistory,
	searchHistoryList,
	searchHistoryListLoading,
	setSearch,
	fetchFaqSearchHistory,
	setInput,
}) {
	const { onClickClearHistory = () => {} } = useUpdateFaqSearchHistory({
		setShowHistory,
	});

	useEffect(() => {
		fetchFaqSearchHistory();
	}, [fetchFaqSearchHistory]);

	const today = new Date();
	const formatToday = format(today, 'dd MMMM');
	const yesterday = new Date(today.getTime() - 86400000); // 86400000 is the number of milliseconds in a day
	const formatYesterday = format(yesterday, 'dd MMMM');

	const filteredObject = useMemo(() => {
		const modifiedFilteredObject = {};

		(searchHistoryList || []).forEach((aaa) => {
			const { updated_at, requested_search } = aaa || {};
			const date = format(updated_at, 'dd MMMM');
			const time = format(updated_at, 'hh:mm aa');

			if (date && requested_search) {
				if (!modifiedFilteredObject[date]) {
					modifiedFilteredObject[date] = [{ question: requested_search, time }];
				} else {
					modifiedFilteredObject[date].push({ question: requested_search, time });
				}
			}
		});

		return modifiedFilteredObject;
	}, [searchHistoryList]);

	const sortedDates = Object.keys(filteredObject || {})
		.map((item) => item)
		.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	const DAY_MAPPING = {
		[formatToday]     : 'Today',
		[formatYesterday] : 'Yesterday',
	};

	if (searchHistoryListLoading) return <Loader />;

	if (isEmpty(searchHistoryList)) {
		return <div className={styles.empty_state_wrapper}>No History Found</div>;
	}

	return (
		<div className={styles.container}>

			{sortedDates.map((ele) => (

				<div className={styles.question_division}>

					<div className={styles.header}>{DAY_MAPPING[ele] || ele}</div>

					{(filteredObject[ele] || []).map((element) => {
						const { question, time } = element;
						return (
							<div
								className={styles.question_time_container}
								role="presentation"
								onClick={() => { setSearch(question); setInput(question); }}
							>
								<div className={styles.question_wrapper}>{question}</div>
								<div className={styles.time_wrapper}>{time}</div>
							</div>
						);
					})}
				</div>
			))}
			<div
				className={styles.clear_search}
				role="presentation"
				onClick={onClickClearHistory}
			>
				Clear History

			</div>
		</div>
	);
}

export default SearchHistoryList;
