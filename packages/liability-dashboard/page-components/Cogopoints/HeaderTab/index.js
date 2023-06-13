import { Tabs, TabPanel } from '@cogoport/components';

import { HEADER_TAB_OPTIONS } from '../../../constants';

import styles from './styles.module.css';

function HeaderTab({
	activeHeaderTab = '',
	setActiveHeaderTab = () => {},
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeHeaderTab}
				themeType="primary"
				fullWidth
				onChange={(tab) => setActiveHeaderTab(tab)}
			>
				{HEADER_TAB_OPTIONS.map(({ name, title }) => (
					<TabPanel name={name} title={title} key={name} />
				))}
			</Tabs>
		</div>
	);
}

export default HeaderTab;
