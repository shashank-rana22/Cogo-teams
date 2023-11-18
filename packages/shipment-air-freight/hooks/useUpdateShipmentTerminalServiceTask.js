import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../page-components/Tasks/TaskExecution/utils/format-payload-terminal-service-task';

function useUpdateShipmentTerminalServiceTask({
	type = 'terminal',
	task_id = '',
	localServiceId = '',
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
			localServiceId,
			sheetData,
			entityData,
			collectionPartyData,
		});

		try {
			if (!isEmpty(additionalServicePayload)) {
				await trigger({
					data: additionalServicePayload,
				});
			}
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
