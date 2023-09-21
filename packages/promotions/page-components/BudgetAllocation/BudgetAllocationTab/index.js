import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useState } from 'react';

import DeactiveModal from './DeactiveModal';
import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function BudgetAllocationTab() {
	const [activeList, setActiveList] = useState('active');
	const [addAllocateModal, setAddAllocateModal] = useState(false);
	return (
		<div className={styles.container}>
			<div>
				<Tabs
					themeType="primary"
					activeTab={activeList}
					onChange={(val) => {
						setActiveList(val);
					}}
				>
					{OPTIONS.map((item) => {
						const { label = '', value = '' } = item;
						return (
							<TabPanel
								themeType="primary"
								key={value}
								name={value}
								title={label}
							/>
						);
					})}
				</Tabs>
			</div>
			<div className={styles.filter_create}>
				<Button
					size="lg"
					themeType="primary"
					className={styles.add_btn}
					onClick={() => setAddAllocateModal(true)}
				>
					Allocate
				</Button>
				{addAllocateModal && (
					<DeactiveModal onClose={() => setAddAllocateModal(false)} />
				)}
			</div>
		</div>
	);
}

export default BudgetAllocationTab;
