import { toast } from '@cogoport/components';
import useForm from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import controls from './controls';
import STAKE_HOLDER_SPECIFIC_PROPS from './stakeHolderCongifs';
import useGetContainerDetails from './useGetContainerDetails';

const getWhoIsAddingRate = ({ isSeller, scope, item, status }) => {
	let who_is_adding_rate = 'customer';
	if (scope === 'partner' && !isSeller && (!item?.buy_price || !item?.id)) {
		who_is_adding_rate = 'okam_create';
	}
	if (scope === 'partner' && !isSeller && item?.buy_price && item?.id) {
		who_is_adding_rate = 'okam_update';
	}
	if (isSeller && !item.buy_price) {
		who_is_adding_rate = 'so_create';
	}
	if (
		['requested_for_service_provider', 'cancelled_by_supplier'].includes(
			status?.status,
		)
	) {
		who_is_adding_rate = 'so_update';
	}
	if (status?.status === 'customer_confirmation_pending') {
		who_is_adding_rate = 'customer';
	}
	return who_is_adding_rate;
};

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
	const scope = useSelector(({ general }) => general?.scope);

	const who_is_adding_rate = getWhoIsAddingRate({
		isSeller,
		scope,
		item,
		status,
	});
	const preProps = STAKE_HOLDER_SPECIFIC_PROPS[who_is_adding_rate];

	const options = [];
	if (item?.units) {
		item?.units?.forEach((unit) => {
			options.push({ label: startCase(unit), value: unit });
		});
	} else options.push({ label: startCase(item?.unit), value: item?.unit });

	const { containerList } = useGetContainerDetails(item);

	const initialControls = controls(options, item, containerList);

	const newControls = initialControls
		.filter(
			(ctrl) => !ctrl.stakeholder || ctrl.stakeholder.includes(who_is_adding_rate),
		)
		.map((ctrl) => ({
			...ctrl,
			disabled: scope === 'app' ? true : ctrl.disabled && preProps.buy_disabled,
		}));

	const mappedCtrls = newControls.map((ctrl) => ({
		...ctrl,
		value: item[ctrl.name],
	}));

	const {
		fields,
		handleSubmit,
		formState: { errors },
	} = useForm(mappedCtrls);
	const addRateApi = useRequest('post', false, 'partner')(preProps.api);

	const addRate = async (data) => {
		const addedService = (item.services || []).find((service) => {
			if (filters?.service_type?.includes('?')) {
				return service.id === filters?.service_type?.split('?')?.[1];
			}
			return service.service_type === item?.service_type;
		});

		let add_to_sell_quotation;
		if (who_is_adding_rate === 'okam_update' && data.price === item.price) {
			preProps.state = 'requested_for_importer_exporter';
		}
		if (['customer', 'okam_create'].includes(who_is_adding_rate)) {
			add_to_sell_quotation = true;
		}
		try {
			const payload =				preProps.api === '/create_shipment_additional_service'
				? {
					name        : item?.name,
					code        : item.code,
					shipment_id : item.shipment_id,
					service_type:
								item?.service_type === 'trailer_freight_service'
									? 'haulage_freight_service'
									: item?.service_type,
					service_id            : addedService?.id,
					is_rate_available     : true,
					state                 : preProps.state,
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
					  }
				: {
					id                    : item.id,
					quantity              : Number(data.quantity) || undefined,
					price                 : Number(data.price) || undefined,
					buy_price             : Number(data.buy_price) || undefined,
					currency              : data.currency || undefined,
					state                 : preProps.state,
					service_provider_id   : data.service_provider_id || undefined,
					pending_task_id       : item.pending_task_id || undefined,
					add_to_sell_quotation : billToCustomer,
					alias                 : data.alias || undefined,
					container_number      : data?.container_number || undefined,
					  };

			await addRateApi.trigger({
				data: payload,
			});

			toast.success('Service Added successfully');
			setShow(false);
			setAddRate(null);
			onCancel();
			refetch();
		} catch (err) {
			toast.error(err?.data);
		}
	};

	return {
		fields,
		controls : mappedCtrls,
		addRate,
		handleSubmit,
		loading  : addRateApi.loading,
		errors,
	};
};

export default useAddRate;
