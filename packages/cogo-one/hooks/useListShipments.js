import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const getParams = () => ({
	filters: {
		state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	},
	get_shipment_quotation_data : true,
	// milestone_data_required     : true,
	page                        : 1,
});

function useListShipments() {
	// const { profileId } = useSelector(({ profile }) => ({ profileId: profile.user.id }));

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams(),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[trigger],
	);

	return {
		listLoading   : loading,
		shipmentsData : data,
		getShipmentsList,
	};
}

export default useListShipments;
