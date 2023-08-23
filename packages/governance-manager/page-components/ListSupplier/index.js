/* eslint-disable no-magic-numbers */
import { Placeholder, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Item from './Item';
import styles from './styles.module.css';

function ListSupplier({
	t,
	supplierList = [],
	loading,
	currentPage,
	totalCount,
	setCurrentPage,
}) {
	return (
		<div>
			{
				!loading
				&& (isEmpty(supplierList) ? (
					<div className={styles.no_data_found}>
						{t('main_page_no_data_found')}
					</div>
				)
					: (
						<>
							{supplierList?.map((item) => (
								<Item
									t={t}
									item={item}
									key={item}
								/>

							))}
							<Pagination
								className={styles.pagination}
								type="number"
								currentPage={currentPage}
								totalItems={totalCount || 1}
								pageSize={10}
								onPageChange={setCurrentPage}
							/>

						</>
					)

				)
            }
			{
				loading && [...Array(6)]?.map((index) => (
					<Placeholder
						key={index}
						height="100px"
						width="100%"
						margin="10px 0px 0px  0px"
					/>
				))
			}
		</div>
	);
}

export default ListSupplier;
