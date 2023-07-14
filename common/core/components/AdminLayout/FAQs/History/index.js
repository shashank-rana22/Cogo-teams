import { Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import Answer from '../QuestionList/Answer';

import useGetUserRequestedFaqs from './hooks/useGetUserRequestedFaqs';
import useListFaqSearchHistory from './hooks/useListFaqSearchHistory';
import RequestedQuestionList from './RequestedQuestionList';
import SearchHistoryList from './SearchHistoryList';
import styles from './styles.module.css';

function History({
	question,
	setQuestion = () => {},
	setShowHistory = () => {},
	setSearch = () => {},
	setInput,
}) {
	const [activeTab, setActiveTab] = useState('requested_question');

	const { list = [], getUserFaqs, loading } = useGetUserRequestedFaqs();

	const {
		searchHistory,
		setSearchHistory,
		list: searchHistoryList,
		loading: searchHistoryListLoading,
		fetchFaqSearchHistory,
	} = useListFaqSearchHistory();

	const newQuestions = (list || []).filter((listItem) => !listItem?.is_viewed);

	const newQuestionCount = (newQuestions || []).length;

	const suffix = !searchHistory ? (
		<div className={styles.icon_wrapper}>
			<IcMSearchlight />
		</div>
	) : (
		<div className={styles.icon_wrapper}>
			<IcMCross
				onClick={() => setSearchHistory('')}
				style={{ cursor: 'pointer', color: '#000000' }}
			/>
		</div>
	);

	if (question) {
		return <Answer question={question} setQuestion={setQuestion} />;
	}

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
				className={styles.tab_panel}
				fullWidth
			>
				<TabPanel
					name="requested_question"
					title="Requested "
					badge={(newQuestions || []).length > 0 ? newQuestionCount : null}
				>
					<RequestedQuestionList
						setQuestion={setQuestion}
						question={question}
						list={list}
						getUserFaqs={getUserFaqs}
						loading={loading}
					/>
				</TabPanel>

				<TabPanel
					name="search_history"
					title="Search History"

				>

					<div className={styles.input_container}>

						<Input
							className="primary lg"
							placeholder="Search within history"
							value={searchHistory}
							onChange={(e) => setSearchHistory(e)}
							suffix={suffix}
						/>
					</div>

					<SearchHistoryList
						setShowHistory={setShowHistory}
						searchHistoryList={searchHistoryList}
						searchHistoryListLoading={searchHistoryListLoading}
						setSearch={setSearch}
						fetchFaqSearchHistory={fetchFaqSearchHistory}
						setInput={setInput}
					/>

				</TabPanel>
			</Tabs>
		</div>
	);
}

export default History;
