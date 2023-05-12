import { Loader } from '@cogoport/components';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import useListShipmentBookingConfirmationPreferences
	from '../../../../../hooks/useListShipmentBookingConfirmationPreferences';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';
import useUpdateShipmentService from '../../../../../hooks/useUpdateShipmentService';

import Card from './Card';
import styles from './styles.module.css';

function ChooseServiceProvider({
	task = {},
	refetch = () => {},
	onCancel = () => {},
	services = [],
}) {
	const service_ids = [];

	(services || []).map((serviceObj) => {
		if (serviceObj.service_type === 'fcl_freight_service') {
			service_ids.push(serviceObj?.id);
		}
		return service_ids;
	});

	const { data = {}, loading = true } = useListShipmentBookingConfirmationPreferences({
		defaultFilters: {
			service_id   : service_ids,
			service_type : task.service_type,
		},
		shipment_id: services[0]?.shipment_id,
	});

	const { apiTrigger: updateTask } = useUpdateShipmentPendingTask({ });

	const { apiTrigger: updateService } = useUpdateShipmentService({ });

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
		const performed_by_org_id = mainService?.service_provider?.id;
		const ids = [...fclServiceIds];

		try {
			await updateService({
				ids,
				data: {
					service_provider_id : item?.data?.[0]?.service_provider_id,
					shipping_line_id    : item?.data?.[0]?.shipping_line_id,
				},
				performed_by_org_id,
				service_type:
						mainService?.service_type || mainService?.display_service_type,
				shipment_id: mainService?.shipment_id,
			});

			if (localServiceIds > 0) {
				await updateService({
					data: {
						service_provider_id : serviceProvider,
						shipping_line_id    : item?.data?.[0]?.shipping_line_id,
					},
					ids                 : localServiceIds,
					service_type        : 'fcl_freight_local_service',
					shipment_id         : task?.shipment_id,
					performed_by_org_id : serviceProvider,
				});
			}

			await updateTask({ id: task?.id });
			onCancel();
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader themeType="primary" />
			</div>
		);
	}

	return (
		data?.list?.length > 0
			? data?.list.map((item) => (
				<Card
					key={item?.id}
					item={item}
					priority={item.priority}
					handleUpdateTask={handleUpdateTask}
				/>
			))
			: (
				<EmptyState subEmptyText="No Booking Preference Found" />
			)
	);
}
export default ChooseServiceProvider;
