import { Tabs, TabPanel } from '@cogoport/components';
// import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
// import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

// import Answer from '../QuestionList/Answer';

import styles from './styles.module.css';

function History() {
	const [activeTab, setActiveTab] = useState('requested_question');

	// const newQuestions = (list || []).filter((listItem) => !listItem?.is_viewed);

	// const newQuestionCount = (newQuestions || []).length;

	// const suffix = !searchHistory ? (
	// 	<IcMSearchlight />
	// ) : (
	// 	<IcMCross
	// 		onClick={() => setSearchHistory('')}
	// 		style={{ cursor: 'pointer', color: '#000000' }}
	// 	/>
	// );

	// if (question) {
	// 	return <Answer question={question} setQuestion={setQuestion} />;
	// }

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel
					name="requested_question"
					title="Requested "
					// badge={(newQuestions || []).length > 0 ? newQuestionCount : null}
				>

					fds
				</TabPanel>

				<TabPanel name="search_history" title="Search History">

					fghjk
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default History;
