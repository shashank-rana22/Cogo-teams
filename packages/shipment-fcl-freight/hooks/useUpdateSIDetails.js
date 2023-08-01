import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getControls from '../common/Tasks/TaskExecution/CustomTasks/UploadSI/TaskForm/controls';

const FILE_NAME_IN_URL_SLICE_INDEX = -1;

const formatData = (data, pendingTask, services) => {
	const modifiedData = (data.container || []).map((item) => ({
		id   : item?.id,
		data : {
			container_number      : item?.container_number,
			container_seal_number : item?.container_seal_number,
		},
	}));

	const modifiedSIData = (data.documents || []).map((item) => {
		const url = typeof (item?.url) === 'string'
			? {
				fileName : item?.url?.split('/').slice(FILE_NAME_IN_URL_SLICE_INDEX).join(''),
				finalUrl : item?.url,
			} : item?.url;

		return {
			document_type : 'si',
			document_url  : url?.finalUrl,
			file_name     : url?.fileName,
			data          : {
				description : item?.description || undefined,
				url         : url?.finalUrl,
			},
		};
	});

	const formattedData = {
		id   : pendingTask.id,
		data : {
			container_detail: {
				update_data: modifiedData,
			},
			documents: modifiedSIData,
		},
	};

	formattedData.data.fcl_freight_service = {
		id: (services || []).find(
			(service) => service?.service_type === 'fcl_freight_service',
		)?.id,
	};

	return formattedData;
};

const useUpdateSIDetails = ({
	apis_data = {},
	onCancel = () => {},
	pendingTask = {},
	services = [],
	taskListRefetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const { modifiedControls, showElements } = getControls({ apis_data });

	const defaultValues = {
		container : [],
		documents : [
			{
				url         : undefined,
				description : undefined,
			},
		],
	};

	apis_data?.list_shipment_container_details?.forEach((container) => {
		defaultValues.container.push({
			id                    : container?.id,
			container_number      : container?.container_number,
			container_seal_number : '',
		});
	});

	const { control, formState:{ errors = {} }, handleSubmit } = useForm({
		defaultValues,
	});

	const onSubmit = async (data) => {
		const formattedData = formatData(
			data,
			pendingTask,
			services,
		);

		try {
			await trigger({
				data: formattedData,
			});

			Toast.success('Task Completed Successfully');
			onCancel();
			taskListRefetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		formProps: {
			control,
			errors,
			modifiedControls,
			showElements,
			handleSubmit,
			onSubmit,
		},
		loading,
	};
};

export default useUpdateSIDetails;
