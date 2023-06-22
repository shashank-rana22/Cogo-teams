import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListConsolidatedShipments from '../../../../hook/useListConsolidatedShipments';

import LoadingState from './LoadingState/index';
import ShipmentCard from './ShipmentCard/index';
import styles from './styles.module.css';

export interface ConsolidatedSidsInterace {
	consolidatedSids: Array<string>,
}

export interface ItemDataProps {
	id: string,
	serial_id: string,
}

const CARD_ARRAY = [1, 2, 3, 4];

function ShipmentIdView({ consolidatedSids }: ConsolidatedSidsInterace) {
	const {
		loading,
		data,
		pageFilters,
		setPageFilters,
	} = useListConsolidatedShipments(consolidatedSids);

	const { list, page, total_count: totalCount, page_limit: pageLimit } = data || {};

	const handleShipmentView = () => {
		if (loading) {
			return (
				<div>
					{CARD_ARRAY.map((val) => <LoadingState key={val} />)}
				</div>
			);
		}
		if (isEmpty(list)) {
			return (
				<div className={styles.data_not_found}>Data Not Found</div>
			);
		}
		return (
			<div className={styles.pagination}>
				{ list?.map((item) => <ShipmentCard key={item?.serial_id} shipmentData={item} />)}
				<Pagination
					currentPage={page}
					onPageChange={(val: number) => setPageFilters({
						...pageFilters,
						page: val,
					})}
					totalItems={totalCount}
					pageSize={pageLimit}
					type="table"
				/>
			</div>
		);
	};

	return isEmpty(consolidatedSids)
		? <div className={styles.data_not_found}>Data Not Found</div>
		: handleShipmentView();
}

export default ShipmentIdView;
