import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import config from '../configurations/config.json';
import getChangedObjectValues from '../utils/getChangedObjectValues';
import getValue from '../utils/getValue';

const createPreviousSavedPayload = ({ data, showSavedPOC }) => {
	if (isEmpty(data)) {
		return {};
	}

	let pocDetails = [];
	if (showSavedPOC) {
		pocDetails = getValue(data, 'organization_pocs', []).map((poc) => ({
			name                          : getValue(poc, 'name'),
			email                         : getValue(poc, 'email'),
			mobile_country_code           : getValue(poc, 'mobile_country_code'),
			mobile_number                 : getValue(poc, 'mobile_number'),
			alternate_mobile_country_code : getValue(
				poc,
				'alternate_mobile_country_code',
			),
			alternate_mobile_number: getValue(poc, 'alternate_mobile_number'),
		}));
	}

	return {
		...data,
		poc_details: pocDetails,
	};
};

const useSaveAddress = (props) => {
	const {
		organizationId,
		tradePartyId,
		addressData,
		addressType,
		action,
		onSuccess: onSuccessCallback,
		onFailure: onFailureCallback,
		showSavedPOC,
		source = '',
	} = props;

	const { apiEndpoints } = config[addressType] || {};
	const apiEndpoint = apiEndpoints[action];

	const [{ loading }, trigger] = useRequest({
		url    : `/${apiEndpoint}`,
		method : 'post',
	}, { manual: true });

	const getPayload = ({ values }) => {
		const {
			organization_trade_party_id: valuesTradePartyId,
			isAddressRegisteredUnderGst,
			poc_details: valuesPocDetails,
			...valuesAddress
		} = values;

		const previousSavedPayload = createPreviousSavedPayload({
			data: addressData,
			showSavedPOC,
		});

		const newPayload = getChangedObjectValues({
			values: {
				...valuesAddress,
				organization_pocs: valuesPocDetails,
			},
			previousValues: previousSavedPayload,
		});

		const { organization_pocs: pocDetailsPayload, ...addressPayload } =			newPayload;

		const id = getValue(addressData, 'id');

		let obj = {};
		if (!id) {
			obj = {
				organization_id             : organizationId,
				organization_trade_party_id : valuesTradePartyId || tradePartyId,
			};
		}

		return {
			id,
			...obj,
			...addressPayload,
			source,
			poc_details: isEmpty(pocDetailsPayload) ? [] : pocDetailsPayload,
		};
	};

	const saveAddress = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			const response = await trigger({ data: payload });

			onSuccessCallback({ response: response.data });
		} catch (error) {
			onFailureCallback({ error });
		}
	};

	return {
		loading,
		saveAddress,
	};
};

export default useSaveAddress;
