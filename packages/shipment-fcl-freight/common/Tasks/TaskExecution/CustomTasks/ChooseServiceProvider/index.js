import { Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';

import useListShipmentBookingConfirmationPreferences
	from '../../../../../hooks/useListShipmentBookingConfirmationPreferences';
import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';
import useUpdateShipmentService from '../../../../../hooks/useUpdateShipmentService';

import Card from './Card';
import styles from './styles.module.css';

const SUCCESS_HTTP_CODE = 200;
function ChooseServiceProvider({
	task = {},
	refetch = () => {},
	onCancel = () => {},
	services = [],
}) {
	const SERVICE_IDS = [];
	let title = {};
	(services || []).forEach((serviceObj) => {
		if (serviceObj.service_type === 'fcl_freight_service') {
			SERVICE_IDS.push(serviceObj?.id);
			title = {
				...title,
				[serviceObj?.id]: `${serviceObj.container_count} * 
				${serviceObj.container_size} ${serviceObj.container_type} ${serviceObj.commodity}`,
			};
		}
	});

	const { data = {}, loading = true } = useListShipmentBookingConfirmationPreferences({
		defaultFilters: {
			service_id   : SERVICE_IDS,
			service_type : task.service_type,
		},
		shipment_id: services[GLOBAL_CONSTANTS.zeroth_index]?.shipment_id,
	});

	const { apiTrigger: updateTask } = useUpdateShipmentPendingTask({});

	const { apiTrigger: updateService } = useUpdateShipmentService({});

	const handleUpdateTask = async (item, serviceProvider) => {
		const mainService = (services || []).filter(
			(service) => service.service_type === 'fcl_freight_service',
		)?.[GLOBAL_CONSTANTS.zeroth_index];

		const LOCAL_SERVICE_IDS = [];
		const FCL_SERVICE_IDS = [];
		(services || []).forEach((serviceObj) => {
			if (serviceObj?.service_type?.includes('fcl_freight_local_service')) {
				LOCAL_SERVICE_IDS.push(serviceObj?.id);
			} else if (serviceObj?.service_type?.includes('fcl_freight_service')) {
				FCL_SERVICE_IDS.push(serviceObj?.id);
			}
		});
		const performed_by_org_id = mainService?.service_provider?.id;
		const ids = [...FCL_SERVICE_IDS];

		try {
			const res_fcl = await updateService({
				ids,
				data: {
					service_provider_id : item?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.service_provider_id,
					shipping_line_id    : item?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
				},
				performed_by_org_id,
				service_type:
						mainService?.service_type || mainService?.display_service_type,
				shipment_id: mainService?.shipment_id,
			});

			if (!isEmpty(LOCAL_SERVICE_IDS) && res_fcl?.status === SUCCESS_HTTP_CODE) {
				const res_local = await updateService({
					data: {
						service_provider_id : serviceProvider,
						shipping_line_id    : item?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.shipping_line_id,
					},
					ids                 : LOCAL_SERVICE_IDS,
					service_type        : 'fcl_freight_local_service',
					shipment_id         : task?.shipment_id,
					performed_by_org_id : serviceProvider,
				});

				if (res_local?.status === SUCCESS_HTTP_CODE) {
					await updateTask({ id: task?.id });
					onCancel();
					refetch();
				}
			} else if (isEmpty(LOCAL_SERVICE_IDS)) {
				await updateTask({ id: task?.id });
				onCancel();
				refetch();
			}
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
		!isEmpty(data?.list)
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
