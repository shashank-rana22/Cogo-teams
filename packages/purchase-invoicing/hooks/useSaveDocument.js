import { useRequest } from '@cogoport/request';
import { get, isEmpty } from '@cogoport/utils';

import toastApiError from '../utils/toastApiError';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
const useSaveDocument = (props) => {
	const {
		orgResponse,
		tradePartyId,
		getOrganizationDocuments,
		data,
		onCloseModal,
		getTradePartnerList,
		source,
	} = props;

	const {
		id: organizationId,
		organization_trade_party_id: organizationTradePartyId,
	} = orgResponse;

	const action = isEmpty(data) ? 'create' : 'edit';

	const apiEndpoint = action === 'create'
		? 'create_organization_document'
		: 'update_organization_document';

	const [{ loading }, trigger] = useRequest({
		url    : `/${apiEndpoint}`,
		method : 'post',
	}, { manual: true });

	const getPayload = ({ values }) => ({
		id                          : get(data, 'id'),
		organization_id             : organizationId,
		verification_status         : 'pending',
		organization_trade_party_id : tradePartyId || organizationTradePartyId,
		...(values || {}),
		source,
	});

	const onSuccess = () => {
		getOrganizationDocuments();
		onCloseModal();
	};

	const onFailure = ({ error }) => {
		toastApiError(error.data);
	};

	const saveDocument = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			await trigger({ data: payload });

			onSuccess();
			getTradePartnerList();
		} catch (error) {
			onFailure({ error });
		}
	};

	return {
		loading,
		saveDocument,
	};
};

export default useSaveDocument;
