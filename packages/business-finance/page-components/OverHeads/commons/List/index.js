import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import commonFunctions from './commonFunctions';
import styles from './styles.module.css';

export const toTitleCase = (str) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return titleCase;
};

function List({
	config = {},
	sort = {},
	setSort = () => {},
	itemData = {},
	renderHeaderCheckbox = () => {},
	functions = {},
	loading = false,
	page = 1,
	handlePageChange = () => {},
	pageSize = 10,
	showPagination = true,
	renderDropdown = () => null,
	showRibbon = false,
}) {
	const {
		showHeader = true,
		fields,
		headerStyles,
		itemStyles,
		bodyStyles,
		showHeaderCheckbox,
	} = config;
	const { totalRecords = 0, list } = itemData || {};

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const isListEmpty = !itemData || isEmpty(list);

	const myRibbonStyle = (status) => {
		switch (status) {
			case 'ACCEPTED':
			case 'FINANCE_ACCEPTED':
				return `${styles.ribbon} ${styles.ribbon_accepted}`;
			case 'INITIATED':
			case 'LOCKED':
				return `${styles.ribbon} ${styles.ribbon_pending}`;
			case 'REJECTED':
			case 'FINANCE_REJECTED':
				return `${styles.ribbon} ${styles.ribbon_rejected}`;
			default:
				return `${styles.ribbon}`;
		}
	};

	return (
		<section>
			{showHeader && !isMobile && (
				<Header
					fields={fields}
					sort={sort}
					setSort={setSort}
					headerStyles={headerStyles}
					showHeaderCheckbox={showHeaderCheckbox}
					renderHeaderCheckbox={renderHeaderCheckbox}
				/>
			)}
			{!isListEmpty || loading ? (
				<div style={bodyStyles}>
					{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
						<div
							className={styles.card_container}
							key={singleitem.key || singleitem}
						>
							<CardColumn
								fields={fields}
								itemStyles={itemStyles}
								singleitem={singleitem}
								config={config}
								loading={loading}
								functions={commonFunctions(functions)}
								isMobile={isMobile}
							/>
							{showRibbon ? (
								<div className={myRibbonStyle(singleitem?.status)}>
									{toTitleCase(singleitem?.status || '')}
								</div>
							) : null}
							{renderDropdown(singleitem)}
						</div>
					))}
				</div>
			) : (
				<div className={styles.no_data}>
					<img
						style={{ width: '24%', margin: '8%' }}
						src={GLOBAL_CONSTANTS.image_url.list_no_result_found}
						alt="no data"
					/>
				</div>
			)}
			{showPagination && (
				<div>
					{totalRecords ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={totalRecords}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					) : null}
				</div>
			)}
		</section>
	);
}

export default List;
