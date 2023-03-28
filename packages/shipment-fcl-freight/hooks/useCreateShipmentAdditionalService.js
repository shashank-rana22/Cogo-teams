import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const useCreateShipmentAdditionalService = ({
	item,
	refetch = () => {},
	setAddRate = () => {},
	onCancel = () => {},
	setShowChargeCodes = () => {},
	setAddSellPrice = () => {},
	filters,
}) => {
	const unitOptions = [];
	if (item?.units) {
		item?.units?.forEach((unit) => {
			unitOptions.push({ label: startCase(unit), value: unit });
		});
	} else unitOptions.push({ label: startCase(item?.unit), value: item?.unit });

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

	const requestRate = async (data) => {
		try {
			const addedService = (data.services || []).find(
				(service) => service.service_type === data.service_type,
			);
			await trigger({
				data: {
					name                  : data?.name,
					code                  : data.code,
					shipment_id           : data.shipment_id,
					service_type          : data.service_type,
					service_id            : addedService?.id,
					// performed_by_org_id: 'e0c1ce39-299a-44c4-b5e8-03c25bde387e',
					is_rate_available     : false,
					state                 : 'requested_for_importer_exporter',
					add_to_sell_quotation : true,
				},
			});
			Toast.success('Rate Requested successfully');
			setShowChargeCodes(false);
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	const onAddRate = async (data) => {
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
			setAddRate(false);
			setShowChargeCodes(false);
			setAddSellPrice(false);
			onCancel();
			refetch();
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		fields,
		onAddRate,
		control,
		handleSubmit,
		register,
		loading,
		errors,
		unitOptions,
		requestRate,
	};
};

export default useCreateShipmentAdditionalService;
