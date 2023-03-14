/* eslint-disable no-console */
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { useSelector } from '@cogo/store';

const useUpdateShipmentService = ({
	task = {},
	refetch = () => {},
	timeLineRefetch = () => {},
	onCancel = () => {},
	services = [],
}) => {
	const scope = useSelector((state) => state.general.scope);
	const updateService = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_service');
	const updateTask = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const handleUpdateTask = async (item, serviceProvider) => {
		const mainService = (services || []).filter(
			(service) => service.service_type === 'fcl_freight_service',
		)?.[0];

		const localServiceIds = [];
		const fclServiceIds = [];
		(services || []).forEach((serviceObj) => {
			if (serviceObj?.service_type?.includes('fcl_freight_local_service')) {
				localServiceIds.push(serviceObj?.id);
			} else if (serviceObj?.service_type?.includes('fcl_freight_service')) {
				fclServiceIds.push(serviceObj?.id);
			}
		});
		const performed_by_org_id = mainService?.service_provider_id;
		const ids = [...fclServiceIds];

		try {
			await updateService.trigger({
				data: {
					ids,
					data: {
						service_provider_id: item?.data?.[0]?.service_provider_id,
						shipping_line_id: item?.data?.[0]?.shipping_line_id,
					},
					performed_by_org_id,
					service_type:
						mainService?.service_type || mainService?.display_service_type,
					shipment_id: mainService?.shipment_id,
				},
			});

			const localServiceRes =
				localServiceIds.length > 0
					? await updateService.trigger({
							data: {
								data: {
									service_provider_id: serviceProvider,
									shipping_line_id: item?.data?.[0]?.shipping_line_id,
								},
								ids: localServiceIds,
								service_type: 'fcl_freight_local_service',
								shipment_id: task?.shipment_id,
								performed_by_org_id: serviceProvider,
							},
					  })
					: {};

			const res = await updateTask.trigger({ data: { id: task?.id } });
			if (!res.hasError && !localServiceRes.hasError) {
				toast.success('Task Completed!');
				onCancel();
				refetch();
				timeLineRefetch();
			}
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
			console.log(err);
		}
	};
	return {
		handleUpdateTask,
	};
};

export default useUpdateShipmentService;
