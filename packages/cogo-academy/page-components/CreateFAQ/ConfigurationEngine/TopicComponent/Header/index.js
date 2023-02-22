import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header({ setConfigurationPage = () => {} }) {
	const router = useRouter();
	const [searchTopicsInput, setSearchTopicssInput] = useState('');
	const [activeTab, setActiveTab] = useState('active');

	const onClickAddTopic = () => {
		router.push(
			'/learning/faq/create/configuration?create=topic',
			'/learning/faq/create/configuration?create=topic',
		);
		setConfigurationPage('topic');
	};

	return (
		<div className={styles.container}>

			<div className={styles.topic}>Topics</div>

			<div className={styles.header_container}>

				<div className={styles.flex_items}>
					<div className={styles.tabs_container}>
						<Tabs
							activeTab={activeTab}
							themeType="tertiary"
							onChange={setActiveTab}
						>
							<TabPanel name="active" title="Active">
								{/* <div>Active</div> */}
							</TabPanel>

							<TabPanel name="inactive" title="Inactive">
								{/* <div>Inactive</div> */}
							</TabPanel>

						</Tabs>
					</div>

					<div className={styles.search}>
						<SearchInput
							value={searchTopicsInput}
							onChange={setSearchTopicssInput}
							size="md"
							placeholder="Search a Topic"
						/>
					</div>

				</div>

				<div>
					<Button onClick={onClickAddTopic}>Add Topic</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
