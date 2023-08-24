import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ selectedData = {}, showPocModal = {} }) => ({
	shipment_id    : showPocModal?.shipmentData?.id,
	primary_poc_id : selectedData?.user_id || selectedData?.id,
});

function useUpdateShipmentPrimaryPoc({
	setShowPocModal = () => {},
	getShipmentsList = () => {},
	setActiveTab = () => {},
	fetchActivityLogs = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_primary_poc',
		method : 'post',
	}, { manual: true });

	const updatePrimaryPoc = async ({ selectedData = {}, showPocModal = {} }) => {
		const {
			user_id = '', userName = '', whatsapp_number_eformat = '',
			mobile_no = '', email = '', countryCode = '',
		} = selectedData;

		const chatData = {
			user_id,
			user_name               : userName,
			whatsapp_number_eformat : whatsapp_number_eformat || mobile_no,
			email,
			channel_type            : 'whatsapp',
			countryCode,
			mobile_no               : `${countryCode?.replace('+', '')}${whatsapp_number_eformat}`,
		};

		try {
			await trigger({
				data: getPayload({ selectedData, showPocModal }),
			});
			Toast.success('Primary Poc Updated Successfully');
			setShowPocModal({ show: false, shipmentData: {} });
			setActiveTab((prev) => ({
				...prev,
				hasNoFireBaseRoom : true,
				data              : chatData,
				tab               : 'message',
			}));
			getShipmentsList();
			fetchActivityLogs();
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
