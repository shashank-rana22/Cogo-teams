import { useForm } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;

const useGetInventoryStock = ({ activeTab = '', filterData = {} }) => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);

	const formProps = useForm();

	const { control, formState:{ errors } } = formProps;

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/awb-inventory/list-stock',
			method  : 'GET',
			authKey : 'get_air_coe_awb_inventory_list_stock',
		},
		{ manual: true },
	);

	const awbInventoryStockList = useCallback((async () => {
		try {
			const { airline = '', origin = '', procured = '' } = filterData;
			await trigger({
				params: {
					airlineId    : airline || undefined,
					airportId    : origin || undefined,
					procuredById : procured || undefined,
					page,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}), [page, trigger, filterData]);

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
