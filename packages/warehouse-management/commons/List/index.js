import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ListHeader from './ListHeader';
import RenderListItem from './RenderListItem';
import styles from './styles.module.css';

const INITIAL_PAGE = 1;
const SIZE_FOR_SHIPMENT_PAGE = 10;
const ZERO_ITEMS = 0;

function List({
	fields = [],
	data = {},
	loading = false,
	listAPI = () => {},
	functions = {},
	Child = <div />,
	totalCount = 0,
	activeTab = '',
	page = 1,
	setPage = () => {},
}) {
	const { list = [] } = data;
	if (activeTab === 'inventory') {
		Object.keys(data).forEach((key) => {
			list.push({
				shipmentId : key,
				details    : data[key],
				noOfBoxes  : data[key].length,
			});
		});
	}

	const [isOpen, setIsOpen] = useState('');

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				<RenderListItem
					activeTab={activeTab}
					list={list}
					loading={loading}
					Child={Child}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					listAPI={listAPI}
					fields={fields}
					functions={functions}
				/>
				{!loading && !isEmpty(data) && (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							totalItems={totalCount || data?.totalRecords || ZERO_ITEMS}
							currentPage={page || INITIAL_PAGE}
							pageSize={SIZE_FOR_SHIPMENT_PAGE}
							onPageChange={setPage}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

export default List;
