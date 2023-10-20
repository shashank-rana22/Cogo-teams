import { Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
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
	config,
	sort,
	setSort,
	itemData,
	renderHeaderCheckbox,
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

	const isListEmpty = !itemData || list?.length === 0;

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
								<div className={styles.ribbon}>
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
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no ressult found.svg"
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
