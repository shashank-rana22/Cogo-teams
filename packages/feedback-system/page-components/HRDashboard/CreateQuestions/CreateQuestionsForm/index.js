import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useState } from 'react';

import CurrentQuestionsTab from '../CurrentQuestionsTab';
import PreviousQuestionsTab from '../PreviousQuestionsTab';

import styles from './styles.module.css';

function CreateQuestionsForm({ showEditOption }) {
	const [activeTab, setActiveTab] = useState('previous');

	return (
		<div className={styles.container}>
			<p>
				{showEditOption ? 'Edit Questions' : 'Create Questions'}
			</p>
			<div className={styles.tab_container}>
				<Tabs
					tabIcon={<IcMProfile />}
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="previous" title="Previous Questions" badge={3}>
						<PreviousQuestionsTab setActiveTab={setActiveTab} />
					</TabPanel>

					<TabPanel name="active" title="Active Questions" badge={5}>
						<CurrentQuestionsTab />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CreateQuestionsForm;
