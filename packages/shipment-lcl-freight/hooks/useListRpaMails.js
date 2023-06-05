import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback, useRef } from 'react';

const KEY_MAPPING = { shipping_instruction: 'si' };

const useListRpaMails = ({ params = {} }) => {
	const { page_no, entity_type, ...restPayload } = params || {};

	const entityType = useRef(entity_type);

	const [response, trigger] = useLensRequest({
		url    : 'list_rpa_mails',
		method : 'GET',
		params : {
			filters: {
				entity_type,
				...restPayload,
			},
			page_no,
		},
	}, { manual: true });

	const getShipmentEmails = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	const newEmailData = [];

	if ((response?.data?.body || [])?.length) {
		(response?.data?.body || [])?.forEach((child) => {
			if (Object.keys(KEY_MAPPING).includes(child?.entity_type)) {
				newEmailData.push({
					...child,
					entity_type: KEY_MAPPING?.[child?.entity_type],
				});
			} else {
				newEmailData.push(child);
			}
		});
	}

	useEffect(() => { entityType.current = entity_type; }, [entity_type]);

	useEffect(() => {
		if (entityType?.current?.length) {
			getShipmentEmails();
		}
	}, [entityType, getShipmentEmails]);

	return {
		emailList: newEmailData,
	};
};

export default useListRpaMails;
