import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import { entityMappingData } from '../P&L/PLStatement/constant';

const useSaveCustom = ({ filters }) => {
	const { profile } = useSelector((state) => state || {});
	const { month = '', entity = '', category = '', colCheck, rowCheck, chip = '', radio = '' } = filters || {};

	const [monthName, year] = ((month || '-').match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
	const numericDate = `${year}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ data, loading:saveLoading },
		saveTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/customizations',
			method  : 'post',
			authKey : 'get_pnl_statement_customizations',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const res = await saveTrigger({
				data: {
					filters: {
						month        : numericDate,
						cogoEntityId : entityMappingData[entity],
						category,
						colCheck,
						rowCheck,
						chip,
						radio,
					},
					createdBy: profile.partner?.id,
				},
			});
			if (res.data) { Toast.success('Customizations Saved'); }
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [category, chip, colCheck, entity, numericDate, profile.partner?.id, radio, rowCheck, saveTrigger]);
	return {
		refetch,
		saveData: data?.data,
		saveLoading,
	};
};
export default useSaveCustom;
