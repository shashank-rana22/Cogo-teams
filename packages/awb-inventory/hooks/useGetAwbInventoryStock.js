import { useForm } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;

const useGetInventoryStock = ({ activeTab, filterData }) => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);

	const formProps = useForm();

	const { control, formState:{ errors } } = formProps;

	const [{ data = {}, loading }, trigger] = useRequestAir(
		'/air-coe/awb-inventory/list-awb-inventory-stock',
		{ manual: true },
	);

	const awbInventoryStockList = useCallback(() => {
		// const { filter = [] } = formValues;
		(async () => {
			try {
				await trigger({
					params: {
						airlineId    : filterData.airline || undefined,
						airportId    : filterData.origin || undefined,
						procuredById : filterData.procured || undefined,
						page,
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [page, trigger, filterData]);

	useEffect(() => {
		setFinalList([]);
		setPage(START_PAGE);
	}, [activeTab, filterData]);

	useEffect(() => {
		awbInventoryStockList();
	}, [page, awbInventoryStockList]);

	return {
		loading,
		setPage,
		page,
		data,
		awbInventoryStockList,
		finalList,
		setFinalList,
		control,
		errors,
	};
};

export default useGetInventoryStock;
