import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import SearchInput from '../../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header(
	{
		activeAudience,
		searchAudienceInput,
		setSearchAudienceInput = () => {},
		setConfigurationPage = () => {},
		setActiveAudience = () => {},
	},
) {
	const router = useRouter();

	const onClickAddAudience = () => {
		router.push(
			'/learning/faq/create/configuration?create=audience',
			'/learning/faq/create/configuration?create=audience',
		);
		setConfigurationPage('audience');
	};

	return (

		<div className={styles.header_container}>

			<div className={styles.flex_items}>
				<div className={styles.tabs_container}>
					<Tabs
						activeTab={activeAudience}
						themeType="tertiary"
						onChange={setActiveAudience}
					>
						{['active', 'inactive'].map((tab) => (
							<TabPanel
								key={tab}
								name={tab}
								title={startCase(tab)}
							/>
						))}

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

			<Button onClick={onClickAddAudience}>Add New Audience Group</Button>

		</div>

	);
}

export default Header;
