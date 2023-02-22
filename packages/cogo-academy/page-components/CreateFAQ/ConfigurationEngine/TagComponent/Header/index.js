import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header({ setConfigurationPage = () => {} }) {
	const router = useRouter();
	const [searchTagsInput, setSearchTagsInput] = useState('');
	const [activeTab, setActiveTab] = useState('active');

	const onClickAddTag = () => {
		router.push(
			'/learning/faq/create/configuration?create=tag',
			'/learning/faq/create/configuration?create=tag',
		);
		setConfigurationPage('tag');
	};

	return (
		<div className={styles.container}>

			<div className={styles.tag}>Tags</div>

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
							value={searchTagsInput}
							onChange={setSearchTagsInput}
							size="md"
							placeholder="Search a Tag"
						/>
					</div>

				</div>

				<div>
					<Button onClick={onClickAddTag}>Add Tag</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
