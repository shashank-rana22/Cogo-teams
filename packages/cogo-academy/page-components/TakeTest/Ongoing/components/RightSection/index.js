import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Body from './Body';
import CogoAssist from './CogoAssist';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RightSection({
	data = {},
	loading,
	setCurrentQuestion,
	currentQuestion,
	fetchQuestions,
	setShowInstructionsModal,
	setActiveState,
	setShowSubmitTestModal,
	total_question_count,
	user_appearance,
	setSubQuestion,
}) {
	const [activeTab, setActiveTab] = useState('questions');

	return (
		<div className={styles.container}>
			<Header setShowInstructionsModal={setShowInstructionsModal} />

			<div className={styles.toggle_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="questions" title="Questions">
						<Body
							data={data}
							loading={loading}
							setCurrentQuestion={setCurrentQuestion}
							fetchQuestions={fetchQuestions}
							currentQuestion={currentQuestion}
							total_question_count={total_question_count}
							user_appearance={user_appearance}
							setSubQuestion={setSubQuestion}
						/>
					</TabPanel>

					<TabPanel name="cogo_assist" title="Cogo Assist">
						<div className={styles.cogo_assist_container}>
							<CogoAssist />
						</div>
					</TabPanel>
				</Tabs>
			</div>

			<Footer setActiveState={setActiveState} setShowSubmitTestModal={setShowSubmitTestModal} />
		</div>
	);
}

export default RightSection;
