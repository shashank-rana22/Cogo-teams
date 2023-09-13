import { Tabs, TabPanel, Input, ButtonIcon, Toggle } from '@cogoport/components';
import { IcMAppSearch, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import tabs from '../../configurations/tabs';

import styles from './styles.module.css';

function Header({
	activeTab = '',
	setActiveTab = () => {},
	searchValue = '',
	setSearchValue = () => {},
}) {
	const { t } = useTranslation();
	const tabOptions = tabs(t);

	return (
		<div className={styles.main_header}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{(tabOptions || []).map((item) => {
					const { name = '', label = '' } = item;

					return (
						<TabPanel
							key={name}
							name={name}
							title={label}
						/>
					);
				})}

			</Tabs>

			<div className={styles.search_toggle_container}>
				<Input
					className={styles.input_search}
					size="sm"
					prefix={<IcMAppSearch />}
					placeholder="Search via AWB Number"
					onChange={(e) => setSearchValue(e)}
					value={searchValue}
					suffix={(
						<ButtonIcon
							onClick={() => setSearchValue('')}
							size="sm"
							icon={<IcMCross />}
							disabled={isEmpty(searchValue)}
						/>
					)}
				/>

				<Toggle
					size="sm"
					name="tc_td_status"
					disabled={false}
					onLabel="All"
					offLabel="Relevant to me"
				/>
			</div>
		</div>
	);
}

export default Header;
