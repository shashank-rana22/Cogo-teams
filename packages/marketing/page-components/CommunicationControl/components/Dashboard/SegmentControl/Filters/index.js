import { Tabs, TabPanel, Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

const FilterBy = dynamic(() => import('./FilterBy'), { ssr: false });

const STATUS_FILTER_OPTIONS = [
	{ label: 'ACTIVE', value: 'active' },
	{ label: 'INACTIVE', value: 'deactive' },
];

const ONE = 1;

function Filters({
	statusFilter = '', setStatusFilter = () => {}, setShowAddModal = () => {}, setFilters = () => {},
	setPagination = () => {}, filters = {},
}) {
	const [isOpen, setIsOpen] = useState(false);

	const onTabChange = (val) => {
		setPagination(ONE);
		setStatusFilter(val);
	};

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={statusFilter}
				themeType="tertiary"
				onChange={onTabChange}
			>
				{STATUS_FILTER_OPTIONS.map((item) => (
					<TabPanel
						key={item.value}
						name={item.value}
						title={item.label}
					/>
				))}
			</Tabs>

			<div className={styles.btn_container}>
				<Button
					onClick={() => setShowAddModal(true)}
					className={styles.btn}
				>
					ADD RULES
				</Button>
				<div className={styles.popver_container}>
					<Popover
						placement="bottom"
						visible={isOpen}
						onClickOutside={() => setIsOpen(false)}
						render={isOpen ? (
							<FilterBy
								setIsOpen={setIsOpen}
								setFilters={setFilters}
								filters={filters}
							/>
						) : null}
					>
						<div>
							<Button
								onClick={() => { setIsOpen((prev) => !prev); }}
								className={styles.btn}
							>
								FILTER BY
								<IcMFilter style={{ marginLeft: 4 }} />
							</Button>
						</div>
					</Popover>
				</div>
			</div>
		</div>
	);
}
export default Filters;
