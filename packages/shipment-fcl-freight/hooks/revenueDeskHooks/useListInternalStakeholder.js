import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListInternalStakeholders = ({ shipment_id }) => {
	const [{ data:internalStakeHoldersList, loading }, trigger] = 	useRequest(
		'/list_shipment_stakeholders',
		{ manual: true },
	);

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id,
					},
					format_by_stakeholder_type_required: true,
				},
			});
		} catch (err) {
			Toast.error(err);
		}
	};

	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment_id]);

	return {
		internalStakeHoldersList,
		loading,
	};
};

export default useListInternalStakeholders;
