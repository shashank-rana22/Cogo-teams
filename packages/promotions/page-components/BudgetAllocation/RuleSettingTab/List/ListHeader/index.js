import {
	TabPanel,
	Tabs,
	Popover,
	Button,
	Input,
	ButtonIcon,
} from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import ListFilters from '../ListFilters';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
];

function ListHeader({
	activeList = '',
	setActiveList = () => {},
	filters = {},
	setFilters = () => {},
	setShowAddRuleForm = '',
}) {
	const [showPopover, setShowPopover] = useState(false);

	const onTabChange = (val) => {
		setActiveList(val);
		setFilters((p) => ({ ...p, page: 1 }));
	};
	return (
		<div className={styles.container}>
			<div>
				<Tabs
					themeType="primary"
					activeTab={activeList}
					onChange={onTabChange}
				>
					{OPTIONS.map((item) => {
						const { label = '', value = '' } = item;
						return (
							<TabPanel
								key={value}
								name={value}
								title={label}
							/>
						);
					})}
				</Tabs>
			</div>
			<div className={styles.filter_create}>
				<Input
					size="sm"
					type="search"
					suffix={(
						<ButtonIcon
							size="sm"
							icon={<IcMSearchlight />}
							disabled
						/>
					)}
					onChange={(e) => { setFilters({ ...filters, serial_id: e }); }}
					placeholder="Search by Serial Id"
				/>
				<div className={styles.filter}>
					<Popover
						placement="bottom"
						interactive
						visible={showPopover}
						onClickOutside={() => setShowPopover(false)}
						content={(
							<ListFilters
								filters={filters}
								setFilters={setFilters}
								setShowPopover={setShowPopover}
							/>
						)}
					>
						<div className={styles.btn}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => setShowPopover(!showPopover)}
							>
								{Object.keys(filters).some((key) => key !== 'serial_id') ? (
									<span className={styles.filter_applied} />
								) : null}
								<IcMFilter style={{ marginRight: 4 }} />
								Filters
							</Button>
						</div>
					</Popover>
				</div>

				<Button
					size="md"
					className={styles.add_btn}
					onClick={() => setShowAddRuleForm(true)}
				>
					Add Rule
				</Button>
			</div>
		</div>
	);
}

export default ListHeader;
