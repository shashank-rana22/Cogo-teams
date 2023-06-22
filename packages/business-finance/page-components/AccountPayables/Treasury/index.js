import React, { useState } from 'react';

import StyledTable from '../../commons/StyledTable';

import Header from './Header';
import useGetEntityList from './hooks/useGetEntityList';
import SelectFilters from './SelectFilters';

function Treasury() {
	const {
		entityListData,
		reportsListData,
		entityListLoading,
		reportsListLoading,
		refetch,
		entityFilters,
		setEntityFilters,
	} = useGetEntityList();

	console.log('entityListData', entityListData);

	console.log('reportsListData', reportsListData);

	return (
		<>
			<Header filters={entityFilters} setFilters={setEntityFilters} />
			<SelectFilters
				filters={entityFilters}
				setFilters={setEntityFilters}
			/>
			{/* <StyledTable
				data={list}
				columns={PaymentList({
					paymentFilters,
					setPaymentFilters,
					setOrderBy,
					sortStyleAsc,
					sortStyleDesc,
				})}
				loading={paymentLoading}
			/> */}
		</>
	);
}

export default Treasury;
