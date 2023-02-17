import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useState } from 'react';

import CurrentQuestionsTab from '../CurrentQuestionsTab';
import PreviousQuestionsTab from '../PreviousQuestionsTab';

import styles from './styles.module.css';

function CreateQuestionsForm({ showQuestion = false }) {
	const [activeTab, setActiveTab] = useState('previous');

	if (!showQuestion) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.tab_container}>
				<Tabs
					tabIcon={<IcMProfile />}
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="previous" title="Previous Questions">
						<PreviousQuestionsTab setActiveTab={setActiveTab} showQuestion={showQuestion} />
					</TabPanel>

					<TabPanel name="active" title="Active Questions">
						<CurrentQuestionsTab showQuestion={showQuestion} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CreateQuestionsForm;
