import { Tabs, TabPanel } from '@cogoport/components';

import List from './List';
import styles from './styles.module.css';

function Content(props) {
	const { activeTab, setActiveTab } = props;

	const TAB_MAPPING = [
		{ name: 'approval', title: 'Approval' },
		{ name: 'all', title: 'All RFQ' },
	];

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{TAB_MAPPING.map(({ name, title }) => (
					<TabPanel name={name} title={title}>
						<List {...props} />
					</TabPanel>
				))}
			</Tabs>

		</div>
	);
}

export default Content;
