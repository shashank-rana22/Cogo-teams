import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback, useRef } from 'react';

const KEY_MAAPINGS = {
	shipping_instruction: 'si',
};

const useShipmentEmails = ({ payload = {} }) => {
	const { page_no, entity_type, ...restPayload } = payload || {};

	const entityType = useRef(entity_type);

	const [recentClassifiedShipmentApi, triggerRecentClassifiedShipment] = useLensRequest({
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
				await triggerRecentClassifiedShipment();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [triggerRecentClassifiedShipment]);

	const NEW_EMAIL_DATA = [];

	if ((recentClassifiedShipmentApi?.data?.body || [])?.length) {
		(recentClassifiedShipmentApi?.data?.body || [])?.forEach((child) => {
			if (Object.keys(KEY_MAAPINGS).includes(child?.entity_type)) {
				NEW_EMAIL_DATA.push({
					...child,
					entity_type: KEY_MAAPINGS?.[child?.entity_type],
				});
			} else {
				NEW_EMAIL_DATA.push(child);
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
		emailList: NEW_EMAIL_DATA,

	};
};

export default useShipmentEmails;
