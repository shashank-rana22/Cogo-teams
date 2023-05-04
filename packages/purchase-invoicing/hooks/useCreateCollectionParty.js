import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import {
	formatCollectionPartyPayload,
	validateData,
} from '../helpers/format-cp-data';
import toastApiError from '../utils/toastApiError';

const useCreateColletctionParty = ({
	onCreate = () => { },
	setCollectionPartyId = () => { },
	serviceProviderId,
}) => {
	const { user_profile = {} } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	// feedbacks to cogolens starts

	const [{ data }] = useRequest({
		url    : '/list_organization_invoicing_parties',
		method : 'get',
		params : {
			filters: {
				organization_id  : serviceProviderId,
				trade_party_type : ['self', 'paying_party'],
			},
			page_limit                              : 10000,
			other_addresses_data_required           : true,
			billing_addresses_data_required         : true,
			organization_payment_mode_data_required : true,
			organization_data_required              : true,
		},
	}, { manual: false });

	const {
		organization: serviceProviderOrg,
		entity_code,
		country,
	} = data?.list?.[0] || {};

	// feedbacks to cogolens end
	const [loading, setLoading] = useState(false);

	const createBillsApi = useRequest('post', false, 'business_finance', {
		authkey: 'post_purchase_bills',
	})('/purchase/bills');

	const updateBillsApi = useRequest('put', false, 'business_finance', {
		authkey: 'put_purchase_bills',
	})('/purchase/bills');

	const createCp = async (values, extraData) => {
		const formatdata = formatCollectionPartyPayload(values, extraData);

		if (validateData(values, extraData)) {
			try {
				setLoading(true);
				const res = await createBillsApi.trigger({
					data: {
						...formatdata,
						createdBy: user_profile.id,
						performedByUserType:
                            user_profile.session_type === 'partner' ? 'AGENT' : 'USER',
					},
				});

				if (!res.hasError) {
					Toast.success('Invoice Added!');
					setCollectionPartyId(res?.data?.id);
					setLoading(false);
					onCreate();
				}
			} catch (err) {
				toastApiError(err?.data);
				setLoading(false);
			}
		}
	};

	const updateCp = async (values, extraData) => {
		const formatdata = formatCollectionPartyPayload(values, extraData);

		if (validateData(values, extraData)) {
			try {
				setLoading(true);
				const res = await updateBillsApi.trigger({
					data: {
						...formatdata,
						updatedBy: user_profile.id,
						performedByUserType:
                            user_profile.session_type === 'partner' ? 'AGENT' : 'USER',
					},
				});

				if (!res.hasError) {
					Toast.success('Invoice Updated!');
					setLoading(false);
					setCollectionPartyId(res?.data?.id);
					onCreate();
				}
			} catch (err) {
				toastApiError(err?.data);
				setLoading(false);
			}
		}
	};

	return {
		createCp,
		updateCp,
		loading,
		serviceProviderOrg: {
			...(serviceProviderOrg || {}),
			entity_code,
			country_code : country?.country_code,
			country_name : country?.name,
		},
	};
};

export default useCreateColletctionParty;
