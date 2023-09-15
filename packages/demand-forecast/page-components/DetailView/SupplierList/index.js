import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../common/EmptyState/EmptyState';
import ListLoading from '../../../common/EmptyState/ListLoading';
import getSupplierTableConfig from '../../../configurations/supplier-table-config';
import useGetRollingFclFreightSuppliers from '../../../hooks/useGetRollingFclFreightSuppliers';
import Card from '../Card';

import styles from './styles.module.css';

const DEFAULT_PAGE_SIZE = 0;
const DEFAULT_TOTAL_ITEM = 0;
const DEFAULT_CURRENT_PAGE = 1;

function SupplierList({ origin_location_id = '', destination_location_id = '', isMiniCluster = false }) {
	const { t } = useTranslation(['demandForecast']);

	const {
		list: dataList = [], pageData, page, setPage, loading,
	} =	 useGetRollingFclFreightSuppliers({ origin_location_id, destination_location_id, isMiniCluster });

	const tableConfig = getSupplierTableConfig({ t });

	if (isEmpty(dataList) && !loading) {
		return (
			<div>
				<EmptyState
					height={250}
					width={400}
					flexDirection="column"
					alignItems="center"
					emptyText="Data Not Found"
					textSize="20"
					marginTop="10px"
				/>
			</div>
		);
	}

	return (
		<div className={styles.list}>
			<div className={styles.row}>
				{tableConfig.map((config) => {
					const { key, title, width } = config;
					return <div key={key} style={{ width, textAlign: 'center' }}>{title}</div>;
				})}
			</div>
			{
				loading ? <ListLoading /> : dataList.map((card) => (
					<Card
						key={card?.id}
						card={card}
						origin_location_id={origin_location_id}
						destination_location_id={destination_location_id}
					/>
				))
			}
			<div className={styles.pagination_container}>
				<Pagination
					totalItems={pageData?.total_count || DEFAULT_TOTAL_ITEM}
					currentPage={page || DEFAULT_CURRENT_PAGE}
					pageSize={pageData?.page_limit || DEFAULT_PAGE_SIZE}
					onPageChange={setPage}
					type="table"
				/>
			</div>

		</div>
	);
}

export default SupplierList;
