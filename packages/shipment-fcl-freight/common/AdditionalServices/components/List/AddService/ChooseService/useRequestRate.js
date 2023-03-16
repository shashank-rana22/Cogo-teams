import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRequestRate = ({ setShow = () => {}, refetch = () => {} }) => {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const { trigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_additional_service');

	const requestRate = async (item) => {
		try {
			const addedService = (item.services || []).find(
				(service) => service.service_type === item.service_type,
			);
			await trigger({
				data: {
					name                  : item?.name,
					code                  : item.code,
					shipment_id           : item.shipment_id,
					service_type          : item.service_type,
					service_id            : addedService?.id,
					// performed_by_org_id: 'e0c1ce39-299a-44c4-b5e8-03c25bde387e',
					is_rate_available     : false,
					state                 : 'requested_for_importer_exporter',
					add_to_sell_quotation : true,
				},
			});
			toast.success('Rate Requested successfully');
			setShow(false);
			refetch();
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading,
		requestRate,
		scope,
	};
};
export default useRequestRate;
