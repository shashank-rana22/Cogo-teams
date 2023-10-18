import { Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import commonFunctions from './commonFunctions';
import styles from './styles.module.css';

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
}) {
	const {
		showHeader = true,
		fields,
		headerStyles,
		itemStyles,
		bodyStyles,
		showHeaderCheckbox,
	} = config;
	const list = itemData?.list;

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

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
			{showPagination && (
				<div>
					{itemData?.totalRecords && (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={itemData?.totalRecords}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					)}
				</div>
			)}
		</section>
	);
}

export default List;
