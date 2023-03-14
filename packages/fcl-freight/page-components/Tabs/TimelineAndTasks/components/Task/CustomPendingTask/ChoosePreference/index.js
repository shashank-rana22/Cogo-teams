import useGetSuppier from '../../../../../commons/Layout/SupplierSelect/useGetSupplier';
import useUpdateShipmentService from './useUpdateShipmentService';
import Card from './Card';

const ChoosePreference = ({
	task = {},
	refetch = () => {},
	timeLineRefetch = () => {},
	onCancel = () => {},
	services = [],
}) => {
	const { handleUpdateTask } = useUpdateShipmentService({
		task,
		refetch,
		timeLineRefetch,
		onCancel,
		services,
	});

	const service_ids = [];

	(services || []).map((serviceObj) => {
		if (serviceObj.service_type === 'fcl_freight_service') {
			service_ids.push(serviceObj?.id);
		}
		return service_ids;
	});

	const { data } = useGetSuppier({
		service_id: service_ids,
		service_type: task.service_type,
	});

	return (
		<div>
			{(data?.list || []).map((item) => {
				return (
					<Card
						item={item}
						priority={item.priority}
						handleUpdateTask={handleUpdateTask}
					/>
				);
			})}
		</div>
	);
};
export default ChoosePreference;
