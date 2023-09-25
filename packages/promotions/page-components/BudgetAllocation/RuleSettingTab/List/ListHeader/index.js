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
	activeService = '',
	setShowAddRuleForm = '',
}) {
	const [showPopover, setShowPopover] = useState(false);
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
						theme="light"
						placement="left"
						animation="scale"
						interactive
						visible={showPopover}
						onClickOutside={() => setShowPopover(false)}
						content={(
							<ListFilters
								filters={filters}
								setFilters={setFilters}
								activeService={activeService}
								setShowPopover={setShowPopover}
							/>
						)}
					>
						<div className={styles.btn}>
							<Button
								themeType="secondary"
								size="lg"
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
					size="lg"
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
