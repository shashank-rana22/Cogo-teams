import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

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
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};
		try {
			const res = await saveTrigger({
				data: {
					filters: {
						month        : numericDate,
						cogoEntityId : entityMapping[entity],
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
