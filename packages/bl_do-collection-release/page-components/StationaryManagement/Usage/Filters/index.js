import { Input, TabPanel, Tabs } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TABS = [
	{
		name  : 'house_bill_of_lading',
		title : 'HBL',
	},
	{
		name  : 'bill_of_lading',
		title : 'MBL',
	},
];

function Filters({ filters = {}, setFilters = () => {} }) {
	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				onChange={(val) => setFilters({ ...filters, document_attributes: [{ document_type: val }] })}
				activeTab={filters.document_type}
			>
				{TABS.map((tab) => (
					<TabPanel
						name={tab.name}
						title={tab.title}
					/>
				))}
			</Tabs>

			<div className={styles.input}>
				<Input
					size="sm"
					value={filters.q || ''}
					onChange={(val) => setFilters({ ...filters, q: val })}
					prefix={<IcMSearchlight />}
				/>
			</div>
		</div>
	);
}

export default Filters;
