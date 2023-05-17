import { TabPanel, Tabs, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TABS_MAPPING = [
	{ label: 'Pending Jobs', value: 'pending_approval' },
	{ label: 'Completed Jobs', value: 'approved' },
	{ label: 'Rejected Jobs', value: 'rejected' },

];

function Header({ filters, setFilters }) {
	return (
		<div className={styles.head}>
			<Tabs
				activeTab={filters?.status}
				onChange={(val) => {
					setFilters({ ...filters, status: val });
				}}
				id="tab_view"
			>
				{TABS_MAPPING.map(({ label = '', value = '' }) => (
					<TabPanel themeType="primary" key={value} name={value} title={label} />
				))}
			</Tabs>
			<div className={styles.input}>
				<Input
					className="primary md"
					value={filters?.q}
					placeholder="Search"
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
