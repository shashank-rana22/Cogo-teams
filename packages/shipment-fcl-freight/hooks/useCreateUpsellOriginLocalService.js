import { useRouter } from '@cogoport/next';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getCreateOrgBillingAddr from '../helpers/getCreateOrgBillingAddr';
import getOriginLocalUpsellPayload from '../helpers/getOriginLocalUpsellPayload';

import useUpdateShipmentPendingTask from './useUpdateShipmentPendingTask';

function useCreateUpsellOriginLocalService({
	task = {},
	shipment_data = {},
	userData = {},
	consigneeId = '',
	primary_service = {},
}) {
	const router = useRouter();
	const [countryId, setCountryId] = useState('');
	const { navigation = '' } = router.query;

	const [{ loading = false }, trigger] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'POST',
	}, { manual: true });

	const [{ loading:upsellLoading }, upsellTrigger] = useRequest({
		url    : '/create_spot_search',
		method : 'POST',
	}, { manual: true });

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({});

	const createOrgBillingAddress = async ({ payload, cargo_readiness_date }) => {
		try {
			const res =	await trigger({ data: payload });

			const taskRes =	await apiTrigger({
				id     : task?.id,
				status : 'pending',
				tags   : ['2'],
				data   : {
					pending_task: {
						id              : task?.id,
						organization_id : shipment_data?.consignee_shipper_id || consigneeId,
					},
					fcl_freight_service: {
						shipment_id: shipment_data?.id,
						cargo_readiness_date,
					},
					shipment: {
						id                   : shipment_data?.id,
						consignee_shipper_id : shipment_data?.consignee_shipper_id || consigneeId,
					},
				},
			});

			if ([res?.status, taskRes?.status].every((s) => s === 200)) {
				const upsellPayload = getOriginLocalUpsellPayload({
					primary_service,
					userData,
					shipment_data,
				});
				const upsellRes = await upsellTrigger({ data: upsellPayload });

				let newHref = `${window.location.origin}/${router?.query?.partner_id}/book/`;
				newHref += `${upsellRes.data?.id}/${upsellRes.data?.importer_exporter_id}/${shipment_data?.id}
				?shipment_type=${shipment_data?.shipment_type}&navigation=${navigation}`;

				window.location.href = newHref;
			}
		} catch (error) {
			toastApiError(error);
		}
	};

	const onSubmit = (values) => {
		const payload = getCreateOrgBillingAddr({
			// task,
			values,
			countryId,
			// organization_id: shipment_data?.consignee_shipper_id || consigneeId,
			// shipment_data,
			userData,
		});

		createOrgBillingAddress({ payload, cargo_readiness_date: values?.cargo_readiness_date });
	};

	return {
		loading: upsellLoading || loading,
		countryId,
		setCountryId,
		onSubmit,
	};
}

export default useCreateUpsellOriginLocalService;
