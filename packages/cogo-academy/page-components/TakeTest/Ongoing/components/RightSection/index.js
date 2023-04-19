import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Body from './Body';
import CogoAssist from './CogoAssist';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	questions   : Body,
	cogo_assist : CogoAssist,
};

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

	const tabPropsProps = {
		questions: {
			title : 'Questions',
			props : {
				data,
				loading,
				setCurrentQuestion,
				currentQuestion,
				fetchQuestions,
				total_question_count,
				user_appearance,
				setSubQuestion,
			},
		},
		cogo_assist: {
			title : 'Cogo Assist',
			props : {},
		},
	};

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
					{Object.keys(COMPONENT_MAPPING).map((key) => {
						const ActiveComponent = COMPONENT_MAPPING[key];
						const { title, props } = tabPropsProps[key];

						return (
							<TabPanel key={key} name={key} title={title}>
								<div className={styles.component_container}>
									<ActiveComponent {...props} />
								</div>
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

			<Footer setActiveState={setActiveState} setShowSubmitTestModal={setShowSubmitTestModal} />
		</div>
	);
}

export default RightSection;
