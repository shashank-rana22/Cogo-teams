import { Toast } from '@cogoport/components';
import { useRequestBf, useRequest } from '@cogoport/request';
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
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

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

	const [loading, setLoading] = useState(false);

	const [{ data:createBillData }, createBillsApi] = useRequestBf({
		url     : '/purchase/bills',
		method  : 'post',
		authKey : 'post_purchase_bills',
	}, { manual: true });

	const [{ data: updateBillsData }, updateBillsApi] = useRequestBf({
		url     : '/purchase/bills',
		method  : 'put',
		authKey : 'put_purchase_bills',
	}, { manual: true });

	const createCp = async (values, extraData) => {
		const formatdata = formatCollectionPartyPayload(values, extraData);

		if (validateData(values, extraData)) {
			try {
				setLoading(true);
				const res = await createBillsApi({
					data: {
						...formatdata,
						createdBy: user_data?.user?.id,
						performedByUserType:
							user_data.session_type === 'partner' ? 'AGENT' : 'USER',
					},
				});

				if (!res.hasError) {
					Toast.success('Invoice Added!');
					setCollectionPartyId({
						billId  : res?.data?.billId,
						partyId : res?.data?.collectionPartyId,
					});
					setLoading(false);
					onCreate();
				}
			} catch (err) {
				toastApiError(err);
				setLoading(false);
			}
		}
	};

	const updateCp = async (values, extraData) => {
		const formatdata = formatCollectionPartyPayload(values, extraData);

		if (validateData(values, extraData)) {
			try {
				setLoading(true);
				const res = await updateBillsApi({
					data: {
						...formatdata,
						updatedBy: user_data?.user?.id,
						performedByUserType:
							user_data.session_type === 'partner' ? 'AGENT' : 'USER',
					},
				});

				if (!res.hasError) {
					Toast.success('Invoice Updated!');
					setLoading(false);
					onCreate();
				}
			} catch (err) {
				toastApiError(err);
				setLoading(false);
			}
		}
	};

	return {
		createCp,
		updateCp,
		loading,
		updateBillsData,
		createBillData,
		serviceProviderOrg: {
			...(serviceProviderOrg || {}),
			entity_code,
			country_code : country?.country_code,
			country_name : country?.name,
		},
	};
};

export default useCreateColletctionParty;
