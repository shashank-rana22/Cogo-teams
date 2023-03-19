import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import controls from './controls';
import useGetContainerDetails from './useGetContainerDetails';

const useAddRate = ({
	item,
	isSeller = false,
	status,
	setShow = () => {},
	refetch = () => {},
	setAddRate = () => {},
	billToCustomer = undefined,
	onCancel = () => {},
	filters,
}) => {
	const options = [];
	if (item?.units) {
		item?.units?.forEach((unit) => {
			options.push({ label: startCase(unit), value: unit });
		});
	} else options.push({ label: startCase(item?.unit), value: item?.unit });

	const { containerList } = useGetContainerDetails(item);

	const initialControls = controls(options, item, containerList);

	const mappedCtrls = initialControls.map((ctrl) => ({
		...ctrl,
		value: item[ctrl.name],
	}));

	const {
		fields,
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const onAddRate = async (data) => {
		console.log('onAddRate', data);
		const addedService = (item.services || []).find((service) => {
			if (filters?.service_type?.includes('?')) {
				return service.id === filters?.service_type?.split('?')?.[1];
			}
			return service.service_type === item?.service_type;
		});

		let add_to_sell_quotation;
		try {
			const payload = {
				name                  : item?.name,
				code                  : item.code,
				shipment_id           : item.shipment_id,
				service_type          : item?.service_type,
				service_id            : addedService?.id,
				is_rate_available     : true,
				quantity              : Number(data.quantity) || undefined,
				buy_price             : Number(data.buy_price) || undefined,
				currency              : data.currency,
				unit                  : data.unit,
				price                 : Number(data.price) || undefined,
				service_provider_id   : data.service_provider_id || undefined,
				pending_task_id       : item.pending_task_id || undefined,
				add_to_sell_quotation : add_to_sell_quotation || undefined,
				alias                 : data.alias || undefined,
				container_number      : data?.container_number || undefined,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Service Added successfully');
			setShow(false);
			setonAddRate(null);
			onCancel();
			refetch();
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		fields,
		controls: mappedCtrls,
		onAddRate,
		control,
		handleSubmit,
		register,
		loading,
		errors,
	};
};

export default useAddRate;
