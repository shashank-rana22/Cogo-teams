import { TabPanel, Tabs, Popover, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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
	setShowGlobalConfigForm = '',
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
						return 	<TabPanel themeType="primary" key={value} name={value} title={label} />;
					})}
				</Tabs>
			</div>
			<div className={styles.filter_create}>
				<div className={styles.filter}>
					<Popover
						theme="light"
						placement="bottom"
						animation="scale"
						interactive
						visible={showPopover}
						onClickOutside={() => setShowPopover(false)}
						content={(
							<ListFilters
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
								{!isEmpty(filters) ? <span className={styles.filter_applied} /> : null}
								<IcMFilter style={{ marginRight: 4 }} />
								Filters
							</Button>
						</div>
					</Popover>
				</div>
				<Button
					size="lg"
					themeType="primary"
					style={{ textTransform: 'capitalize' }}
					onClick={() => setShowGlobalConfigForm(true)}
				>
					Create New
				</Button>
			</div>
		</div>
	);
}

export default ListHeader;
