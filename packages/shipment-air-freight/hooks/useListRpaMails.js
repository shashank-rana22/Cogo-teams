import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useLensRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListRpaMails = ({ params = {} }) => {
	const { page_no, entity_type, ...restPayload } = params || {};

	const [{ data }, trigger] = useLensRequest({
		url    : '/list_rpa_mails',
		method : 'GET',
		params : {
			filters: {
				entity_type,
				...restPayload,
			},
			page_no,
		},
	});

	const getShipmentEmails = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	const NEW_EMAIL_DATA = [];

	if ((data?.body || []).length) {
		(data?.body || []).forEach((child) => {
			if (child?.entity_type === 'shipping_instruction') {
				NEW_EMAIL_DATA.push({
					...child,
					entity_type: 'si',
				});
			} else {
				NEW_EMAIL_DATA.push(child);
			}
		});
	}

	return {
		emailList: NEW_EMAIL_DATA,
		getShipmentEmails,
	};
};

export default useListRpaMails;
