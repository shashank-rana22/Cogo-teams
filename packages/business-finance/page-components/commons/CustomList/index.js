import { Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../StyledTable/EmptyState';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import commonFunctions from './commonFunctions';
import styles from './styles.module.css';

function CustomList({
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
	renderDropdown = () => null,
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

	const isListEmpty = isEmpty(itemData) || isEmpty(list);

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
				<>
					<div style={bodyStyles}>
						{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
							<div className={styles.card_container} key={singleitem?.id}>
								<CardColumn
									fields={fields}
									itemStyles={itemStyles}
									singleitem={singleitem}
									config={config}
									loading={loading}
									functions={commonFunctions(functions)}
									isMobile={isMobile}
								/>
								{renderDropdown(singleitem)}
							</div>
						))}
					</div>
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={totalRecords}
							pageSize={pageSize}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			) : (
				<div className={styles.no_data}>
					<EmptyState imageFind="NoDataFound" />
				</div>
			)}

		</section>
	);
}

export default CustomList;
