import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';
import { isEmpty } from '@cogoport/utils';
import useListConsolidatedShipments from '../../../../hook/useListConsolidatedShipments'
import Card from './Card/index';
import LoadingState from './LoadingState/index';
import styles from './styles.module.css';

export interface consolidatedSidsInterace {
	consolidatedSids: Array<string>,
}

export interface ItemDataProps {
	id: string,
	serial_id: string,
}


function ShipmentIdView({consolidatedSids}: consolidatedSidsInterace) {
	const {
		loading,
		data,
		pageFilters,
		setPageFilters
	} = useListConsolidatedShipments(consolidatedSids);

	const {list, page, total_count, page_limit } = data || {};

	const handleShipmentView = () => {
		if (loading) {
			return (
				<div className={styles.loader}>
					{[1, 2, 3, 4].map((val) => <LoadingState key={val} />)}
				</div>
			);
		}
		if (isEmpty(list)) {
			return (
				<div className={styles.data_not_found}>Data Not Found</div>
			);
		}
		return list?.map((item) => (
			<Card key={item?.serial_id} shipmentData={item}/>
		));
	};

	return isEmpty(consolidatedSids)?
		<div className={styles.data_not_found}>Data Not Found</div> :
		<div>
			{handleShipmentView()}
			<div className={styles.pagination}>
				<Pagination
					currentPage={page}
					onPageChange={(val: number) => setPageFilters({
						...pageFilters,
						page: val,
					})}
					totalItems={total_count}
					pageSize={page_limit}
					type="table"
				/>
			</div>
		</div>
}

export default ShipmentIdView;
