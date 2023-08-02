import { EmptyState } from '@cogoport/air-modules';
import { Pagination, Button } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;
const TOTAL_COUNT_FOR_PAGINATION = 0;
const SIZE_FOR_SHIPMENT_PAGE = 10;
const SIX = 6;
const ONE = 1;
const ZERO = 0;

// activeTab = { activeTab };
// fields = { fields };
// data = { DATA };
// loading = { loading };
// page = { page };
// setPage = { setPage };
// functions = { functions };
// handlePageChange = { handlePageChange };

function List({
	fields = {},
	data = {},
	loading = false,
	functions = {},
	total_count = 0,
	activeTab = '',
	page = 1,
	setPage = () => {},
}) {
	const { list = {} } = data;
	const [isOpen, setIsOpen] = useState(null);

	const render = () => {
		const showList = list.length ? list : Array(SIX).fill(ONE);
		// console.log('showList.1');
		if (loading || list.length) {
			return (showList).map((item) => (
				<div key={item.id}>
					<ListItem
						item={item}
						loading={loading}
						fields={fields}
						functions={functions}
					/>
					{['schedules', 'inventory'].includes(activeTab) && (
						<div
							style={{ '--length': isOpen ? ZERO : '-20px' }}
							className={styles.amaendment_accordian_style}
						>
							{isOpen === item.id ? (
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
							) : (
								<Button
									size="md"
									themeType="linkUi"
									// onClick={() => {
									// 	handleScheduleInfo(singleitem);
									// }}
								>
									<span>Show More</span>
									<IcMArrowDown
										style={{ cursor: 'pointer' }}
									/>
								</Button>
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
	};

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				{render()}
				{!loading && !isEmpty(data) && (
					<div className={styles.pagination_container}>
						<Pagination
							type="number"
							totalItems={total_count || TOTAL_COUNT_FOR_PAGINATION}
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
