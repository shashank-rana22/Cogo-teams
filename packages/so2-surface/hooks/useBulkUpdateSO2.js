import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkUpdateSO2 = () => {
	const { profile = {} } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_stakeholders',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ checkedRows = [], allocatedSo2 = '', setCheckedRows = () => {} }) => {
		try {
			await trigger(
				{
					data: {
						performed_by_user_id   : profile?.session_type,
						performed_by_user_type : profile?.user?.id,
						ids                    : [...checkedRows],
						stakeholder_id         : allocatedSo2,
						stakeholder_type       : 'service_ops2',
						service_id             : null,
						service_type           : null,
					},
				},
			);
			Toast.success('SO2 Updated Successfully');
			setCheckedRows(new Set());
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useBulkUpdateSO2;
