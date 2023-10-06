import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const addressData = [
	{
		id                          : '4ac17bb9-97f6-411e-aa6d-51b20aca8ab0',
		organization_id             : '61788285-f069-4cf5-8d99-31f206f3a65c',
		name                        : 'Ashwin',
		address                     : '56, Test Block, Test Road, Test State, pin: 400706',
		pincode                     : '400706',
		tax_number                  : '25TESTV2233P9ZL',
		is_sez                      : false,
		created_at                  : '2021-09-23T13:08:33.191Z',
		updated_at                  : '2023-05-02T15:30:58.380Z',
		tax_number_document_url     : null,
		poc_details                 : null,
		sez_proof                   : null,
		organization_branch_id      : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
		organization_trade_party_id : '4565b01e-3834-4de9-9769-7489964184d5',
		verification_status         : 'pending',
		rejection_reason            : null,
		organization_pocs           : [],
		organization                : {
			id            : '61788285-f069-4cf5-8d99-31f206f3a65c',
			business_name : 'Vkronus',
			trade_name    : 'Vkronus',
			country_id    : '541d1232-58ce-4d64-83d6-556a42209eb7',
		},
		branch: {
			id          : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
			branch_name : 'Test_Branch35515',
			tax_number  : 'XXXXXXXXXXXXXXX',
			branch_code : 'VKR350891642614655',
		},
		address_type : 'billing',
		country      : 'India',
		state        : 'Maharashtra',
		city         : 'Thane',
	},
	{
		id                          : '60406374-fa54-4525-b954-745e84b50ee6',
		organization_id             : '61788285-f069-4cf5-8d99-31f206f3a65c',
		name                        : 'sagar',
		address                     : '56, Test Block, Test Road, Test State, pin: 400706',
		pincode                     : '400706',
		tax_number                  : '25TESTV2233P9ZL',
		is_sez                      : false,
		created_at                  : '2021-07-02T06:03:33.144Z',
		updated_at                  : '2023-05-02T15:30:58.380Z',
		tax_number_document_url     : null,
		poc_details                 : null,
		sez_proof                   : null,
		organization_branch_id      : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
		organization_trade_party_id : '4565b01e-3834-4de9-9769-7489964184d5',
		verification_status         : 'pending',
		rejection_reason            : null,
		organization_pocs           : [],
		organization                : {
			id            : '61788285-f069-4cf5-8d99-31f206f3a65c',
			business_name : 'Vkronus',
			trade_name    : 'Vkronus',
			country_id    : '541d1232-58ce-4d64-83d6-556a42209eb7',
		},
		branch: {
			id          : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
			branch_name : 'Test_Branch35515',
			tax_number  : 'XXXXXXXXXXXXXXX',
			branch_code : 'VKR350891642614655',
		},
		address_type : 'billing',
		country      : 'India',
		state        : 'Maharashtra',
		city         : 'Thane',
	},
	{
		id                          : '3b1e86d4-774d-4288-a5b2-c94feb9f85f0',
		organization_id             : '61788285-f069-4cf5-8d99-31f206f3a65c',
		name                        : 'Test_User88688',
		address                     : '65, Test Block, Test Road, Test City, Test State',
		pincode                     : '575006',
		country_id                  : '541d1232-58ce-4d64-83d6-556a42209eb7',
		address_type                : 'other',
		created_at                  : '2023-05-10T10:56:29.247Z',
		updated_at                  : '2023-05-10T10:56:29.247Z',
		poc_details                 : null,
		organization_branch_id      : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
		organization_trade_party_id : '4565b01e-3834-4de9-9769-7489964184d5',
		tax_exemption_proof         : null,
		organization_pocs           : [],
		country                     : 'India',
		organization                : {
			id            : '61788285-f069-4cf5-8d99-31f206f3a65c',
			business_name : 'Vkronus',
			trade_name    : 'Vkronus',
		},
		branch: {
			id          : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
			branch_name : 'Test_Branch35515',
			tax_number  : 'XXXXXXXXXXXXXXX',
			branch_code : 'VKR350891642614655',
		},
		state : 'Karnataka',
		city  : 'Dakshina Kannada, Karnataka',
	},
	{
		id                          : '5b23464a-964c-4ee5-b10d-bc6147f6a3d8',
		organization_id             : '61788285-f069-4cf5-8d99-31f206f3a65c',
		name                        : 'Test_User87829',
		address                     : '65, Test Block, Test Road, Test City, Test State',
		pincode                     : '575006',
		country_id                  : '541d1232-58ce-4d64-83d6-556a42209eb7',
		address_type                : 'other',
		created_at                  : '2023-05-10T10:55:15.424Z',
		updated_at                  : '2023-05-10T10:55:15.424Z',
		poc_details                 : null,
		organization_branch_id      : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
		organization_trade_party_id : '4565b01e-3834-4de9-9769-7489964184d5',
		tax_exemption_proof         : null,
		organization_pocs           : [],
		country                     : 'India',
		organization                : {
			id            : '61788285-f069-4cf5-8d99-31f206f3a65c',
			business_name : 'Vkronus',
			trade_name    : 'Vkronus',
		},
		branch: {
			id          : 'bbc7bfbc-d1a7-4e26-9851-20e1f4eb440c',
			branch_name : 'Test_Branch35515',
			tax_number  : 'XXXXXXXXXXXXXXX',
			branch_code : 'VKR350891642614655',
		},
		state : 'Karnataka',
		city  : 'Dakshina Kannada, Karnataka',
	},
];

function useAddress({ billingType }) {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_address_for_insurance',
	}, { manual: true });

	const getBillingAddress = () => {
		try {
			trigger({
				billing_type    : billingType,
				organization_id : '',
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		getBillingAddress();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billingType]);
	console.log(data, 'data');
	return {
		data: addressData, loading,
	};
}

export default useAddress;
