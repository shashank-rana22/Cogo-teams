import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header(
	{
		activeTag,
		searchKeyWord,
		setSearchKeyWord = () => {},
		setConfigurationPage = () => {},
		setActiveTag = () => {},
		reset,
	},
) {
	const router = useRouter();

	const onClickAddTag = () => {
		router.push(
			'/learning/faq/create/configuration?create=tag',
			'/learning/faq/create/configuration?create=tag',
		);
		setConfigurationPage('tag');
		reset();
	};

	return (
		<div className={styles.container}>

			<div className={styles.header_container}>

				<div className={styles.flex_items}>
					<div className={styles.tabs_container}>
						<Tabs
							activeTab={activeTag}
							themeType="tertiary"
							onChange={setActiveTag}
						>
							<TabPanel name="active" title="Active" />

							<TabPanel name="inactive" title="Inactive" />

						</Tabs>
					</div>

					<div className={styles.search}>
						<SearchInput
							value={searchKeyWord}
							onChange={setSearchKeyWord}
							size="md"
							placeholder="Search a key word"
						/>
					</div>

				</div>

				<div>
					<Button onClick={onClickAddTag}>Add New Keyword</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
