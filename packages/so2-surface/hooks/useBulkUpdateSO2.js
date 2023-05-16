import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useBulkUpdateSO2 = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_stakeholders',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ checkedRows = [], allocatedSo2 = '' }) => {
		try {
			await trigger(
				{
					data: {
						ids              : [...checkedRows],
						stakeholder_id   : allocatedSo2,
						stakeholder_type : 'service_ops2',
						service_id       : null,
						service_type     : null,
					},
				},
			);
			Toast.success('SO2 Updated Successfully');
			// refetch();
		} catch (err) {
			Toast.error('Something Went Wrong');
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useBulkUpdateSO2;
