import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header(
	{
		activeAudience,
		searchAudienceInput,
		setSearchAudienceInput = () => {},
		setConfigurationPage = () => {},
		setActiveAudience = () => {},
		// reset,
	},
) {
	const router = useRouter();

	const onClickAddAudience = () => {
		router.push(
			'/learning/faq/create/configuration?create=audience',
			'/learning/faq/create/configuration?create=audience',
		);
		setConfigurationPage('audience');
		// reset();
	};

	return (
		<div className={styles.container}>

			<div className={styles.tag}>Audience Groups</div>

			<div className={styles.header_container}>

				<div className={styles.flex_items}>
					<div className={styles.tabs_container}>
						<Tabs
							activeTab={activeAudience}
							themeType="tertiary"
							onChange={setActiveAudience}
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
							value={searchAudienceInput}
							onChange={setSearchAudienceInput}
							size="md"
							placeholder="Search for Audience"
						/>
					</div>

				</div>

				<div>
					<Button onClick={onClickAddAudience}>Add New Audience Group</Button>
				</div>
			</div>

		</div>
	);
}

export default Header;
