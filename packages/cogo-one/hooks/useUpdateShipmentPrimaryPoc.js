import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ selectedData = {}, showPocModal = {} }) => ({
	shipment_id    : showPocModal?.shipmentData?.id,
	primary_poc_id : selectedData?.user_id || selectedData?.id,
});

function useUpdateShipmentPrimaryPoc({ setShowPocModal = () => {}, getShipmentsList = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_primary_poc',
		method : 'post',
	}, { manual: true });

	const updatePrimaryPoc = async ({ selectedData = {}, showPocModal = {} }) => {
		try {
			await trigger({
				data: getPayload({ selectedData, showPocModal }),
			});
			Toast.success('Primary Poc Updated Successfully');
			setShowPocModal({ show: false, shipmentData: {} });
			getShipmentsList();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updatePrimaryPoc,
		updateLoading: loading,
	};
}

export default useUpdateShipmentPrimaryPoc;
