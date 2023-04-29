import { TabPanel, Tabs, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import TABS_MAPPING from '../../../configurations/tabs';

import styles from './styles.module.css';

function Header({ filters, setFilters }) {
	return (
		<div className={styles.head}>
			<Tabs
				activeTab={filters?.status}
				onChange={(val) => {
					setFilters({ ...filters, status: val });
				}}
				id="contracts_tab_view"
			>
				{TABS_MAPPING.map(({ label = '', value = '' }) => <TabPanel name={value} title={label} />)}
			</Tabs>
			<div className={styles.input}>
				<Input
					className="primary md"
					value={filters?.q}
					placeholder="Search Name, Contract Id"
					suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
					onChange={(val) => {
						setFilters({ ...filters, q: val });
					}}
				/>

			</div>
		</div>
	);
}

export default Header;
