import { Pagination, TabPanel, Tabs, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import EmptyState from '../../../CreateModule/components/EmptyState';

import useListTestQuestions from './hooks/useListTestQuestions';
import RenderContent from './RenderContent';
import Search from './Search';
import styles from './styles.module.css';

function QuestionsComponent({ test_id }) {
	const {
		data = {},
		loading,
		refetch,
		activeTab,
		debounceQuery,
		setActiveTab,
		setSearchQuestion,
		searchQuestion,
		params,
		setParams,
		QUESTIONS_MAPPING,
	} = useListTestQuestions({ test_id });

	const { page_limit = 0, total_count = 0, list: questionsList = [] } = data || {};

	useEffect(() => {
		setParams((prev) => ({
			...prev,
			page: 1,
		}));
	}, [activeTab, setParams]);

	useEffect(() => {
		refetch();
	}, [params, refetch]);

	return (
		<>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					{Object.keys(QUESTIONS_MAPPING).map((item) => {
						const { title } = QUESTIONS_MAPPING[item];

						return (
							<TabPanel
								key={item}
								name={item}
								title={title}
							/>
						);
					})}
				</Tabs>
			</div>

			<Search
				searchQuestion={searchQuestion}
				setSearchQuestion={setSearchQuestion}
				debounceQuery={debounceQuery}
				setParams={setParams}
			/>

			{loading && (
				<div className={styles.placeholder_container}>
					{Array(5).fill('').map(() => (
						<div
							className={styles.placeholder_inner_container}
						>
							<Placeholder height="24px" />
						</div>
					))}
				</div>
			)}

			{!loading && (isEmpty(data?.list) ? <EmptyState /> : (
				<div>
					<RenderContent
						questionsList={questionsList}
						test_id={test_id}
						activeTab={activeTab}
					/>

					{total_count > page_limit ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={params?.page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
							/>
						</div>
					) : null}
				</div>
			))}
		</>
	);
}

export default QuestionsComponent;
