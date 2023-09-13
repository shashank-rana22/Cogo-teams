import { EmptyState } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

import ListItem from './ListItem';
import styles from './styles.module.css';

const LOADING_PLACEHOLDER_COUNT = 10;
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
	const showList = list.length ? list : [...Array(LOADING_PLACEHOLDER_COUNT).keys()];
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
									setIsOpen('');
								}}
							>
								Show Less
								<IcMArrowUp
									style={{ cursor: 'pointer', marginLeft: '3px', marginTop: '1px' }}
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
									style={{ cursor: 'pointer', marginLeft: '3px', marginTop: '1px' }}
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
