import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useSaveCustom = ({ filters }) => {
	const { profile } = useSelector((state) => state || {});
	const { date = '', entity = '', category = '', colCheck, rowCheck, chip = '', radio = '' } = filters || {};

	const entityDetails = GLOBAL_CONSTANTS.cogoport_entities[entity] || {};

	const { id: entityId } = entityDetails;

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
						month        : date || undefined,
						cogoEntityId : entityId,
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
	}, [category, chip, colCheck, entityId, date, profile.partner?.id, radio, rowCheck, saveTrigger]);
	return {
		refetch,
		saveData: data?.data,
		saveLoading,
	};
};
export default useSaveCustom;
