import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-terminal-service-task';

function useUpdateShipmentTerminalServiceTask({
	type = 'terminal',
	task_id = '',
	refetch = () => {},
	mainServicesData = {},
	sheetData = {},
	entityData = {},
	collectionPartyData = {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_terminal_service_task',
		method : 'POST',
	}, { manual: true });

	const updateShipmentTerminalServiceTask = async (values) => {
		const additionalServicePayload = getPayload({
			type,
			task_id,
			values,
			mainServicesData,
			sheetData,
			entityData,
			collectionPartyData,
		});

		try {
			await trigger({
				data: additionalServicePayload,
			});
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateShipmentTerminalServiceTask,
	};
}
export default useUpdateShipmentTerminalServiceTask;
