// import toastApiError from '@cogoport/air-modules/utils/toastApiError';
// import { useRequest } from '@cogoport/request';

// import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-terminal-service-task';

// function useUpdateShipmentTerminalServiceTask({
// 	index = 0,
// 	setTerminalChargeState = () => {},
// 	mainServicesData = {},
// 	setSheetData = () => {},
// }) {
// 	const [{ loading }, trigger] = useRequest({
// 		url    : '/update_shipment_terminal_service_task',
// 		method : 'POST',
// 	}, { manual: true });

// 	const updateShipmentTerminalServiceTask = async (values) => {
// 		const additionalServicePayload = getPayload({
// 			type,
// 			values,
// 			mainServicesData,
// 			sheetData,
// 			entityData,
// 			collectionPartyData,
// 		});

// 		try {
// 			await trigger({
// 				data: additionalServicePayload,
// 			});
// 		} catch (err) {
// 			toastApiError(err);
// 		}
// 	};

// 	return {
// 		loading,
// 		updateShipmentTerminalServiceTask,
// 	};
// }
// export default useUpdateShipmentTerminalServiceTask;
