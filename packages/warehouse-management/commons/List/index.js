import { EmptyState } from '@cogoport/air-modules';
import { Pagination, Button } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ListHeader from './ListHeader';
import ListItem from './ListItem/index';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;
const SIZE_FOR_SHIPMENT_PAGE = 10;
const SHOW_LIST_SIZE = 6;
const ONE = 1;
const ZERO = 0;

function List({
	fields = {},
	data = {},
	loading = false,
	listAPI = () => {},
	functions = {},
	Child = <div />,
	total_count = 0,
	activeTab = '',
	page = 1,
	setPage = () => {},
}) {
	const { list = [] } = data;
	if (activeTab === 'inventory') {
		Object.keys(data).forEach((key) => {
			const MP = {};
			MP.shipmentId = key;
			MP.details = data[key];
			MP.noOfBoxes = data[key].length;
			list.push(MP);
		});
	}

	const [isOpen, setIsOpen] = useState('');

	function Render() {
		const showList = list.length ? list : Array(SHOW_LIST_SIZE).fill(ONE);
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
					{['schedules', 'inventory'].includes(activeTab) && (
						<div
							style={{ '--length': isOpen ? ZERO : '-20px' }}
							className={styles.amaendment_accordian_style}
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
							) : (!loading
								&& (
									<Button
										size="md"
										themeType="linkUi"
										onClick={() => {
											setIsOpen(activeTab === 'schedules'
												? item?.warehouseTransferId : item?.shipmentId);
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

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				<Render />
				{!loading && !isEmpty(data) && (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							totalItems={total_count || data?.totalRecords}
							currentPage={page || INITIAL_PAGE}
							pageSize={SIZE_FOR_SHIPMENT_PAGE}
							onPageChange={(pageVal) => setPage(pageVal)}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

export default List;
