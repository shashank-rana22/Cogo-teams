import { EmptyState } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';

import ListItem from './ListItem';
import styles from './styles.module.css';

const SHOW_LIST_SIZE = 6;
const DEFAULT_LIST_SIZE_ONE = 1;
const CLOSED_LENGTH = 0;

const WAREHOUSE_OPERATIONS_TABS = ['schedules', 'inventory'];

function RenderListItem({
	activeTab = '',
	list = [],
	loading = false,
	Child = <div />,
	isOpen = false,
	setIsOpen = () => {},
	listAPI = () => {},
	fields = [],
	functions = {},
}) {
	const showList = list.length ? list : Array(SHOW_LIST_SIZE).fill(DEFAULT_LIST_SIZE_ONE);
	if (loading || list.length) {
		return (showList).map((item) => (
			<div key={item.warehouseTransferId}>
				<ListItem
					item={item}
					activeTab={activeTab}
					loading={loading}
					fields={fields}
					functions={functions}
					Child={Child}
					listAPI={listAPI}
					isOpen={isOpen}
				/>
				{WAREHOUSE_OPERATIONS_TABS.includes(activeTab) && (
					<div
						style={{ '--length': isOpen ? CLOSED_LENGTH : '-20px' }}
						className={styles.amendment_accordian_style}
					>
						{(isOpen === item?.warehouseTransferId || isOpen === item?.shipmentId) ? (
							<Button
								themeType="linkUi"
								onClick={() => {
									setIsOpen(null);
								}}
							>
								Show Less
								<IcMArrowDown
									style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
								/>
							</Button>
						) : (!loading && (
							<Button
								size="md"
								themeType="linkUi"
								onClick={() => {
									setIsOpen(activeTab === 'schedules' ? item?.warehouseTransferId : item?.shipmentId);
								}}
							>
								<span>Show More</span>
								<IcMArrowDown
									style={{ cursor: 'pointer' }}
								/>
							</Button>
						)
						)}
					</div>
				)}
			</div>
		));
	}
	return (
		<EmptyState
			height="50%"
			width="50%"
			emptyText={`No ${activeTab} found !!`}
			subEmptyText="Looks like no results were found..."
		/>
	);
}

export default RenderListItem;
