import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { Fragment, useState, useEffect } from 'react';

import EmptyState from '../../common/EmptyState';

import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const PAGE_SIZE = 10;
const MOBILE_SCREEN_SIZE = 768;

function Render({
	list = [],
	loading = false,
	fields = [],
	functions = {},
	isMobile = false,
}) {
	if (loading || !isEmpty(list)) {
		return (list).map((singleitem) => (
			<Fragment key={singleitem.id}>
				<ListItem
					singleitem={singleitem}
					fields={fields}
					functions={functions}
					loading={loading}
					isMobile={isMobile}
				/>
			</Fragment>
		));
	}
	return <EmptyState />;
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
}) {
	const [isMobile, setIsMobile] = useState(false);

	const { list = [], total_count:totalCount, page_limit:pageLimit } = listData;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < MOBILE_SCREEN_SIZE) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section>
			{!isMobile && <ListHeader fields={fields} />}
			<div className={styles.scroll}>
				<Render
					list={list}
					loading={loading}
					fields={fields}
					functions={functions}
					isMobile={isMobile}
				/>
				{!loading && !isEmpty(list) && pageLimit < PAGE_SIZE ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(totalCount)}
							pageSize={PAGE_SIZE}
							type="table"
							onPageChange={setPage}
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
