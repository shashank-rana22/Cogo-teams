import { Toast } from '@cogoport/components';
import useAxios from 'axios-hooks';
import { useEffect, useCallback, useRef } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const keyMappings = {
	shipping_instruction: 'si',
};

const useShipmentEmails = ({ payload = {} }) => {
	const { page_no, entity_type, ...restPayload } = payload;

	const entityType = useRef(entity_type);

	const [recentClassifiedShipmentApi, triggerRecentClassifiedShipment] =	useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/list_rpa_mails`,
			method : 'GET',
			params : {
				filters: {
					entity_type,
					...restPayload,
				},
				page_no,
			},
		},
		{ manual: true },
	);

	const getShipmentEmails = useCallback(() => {
		(async () => {
			try {
				await triggerRecentClassifiedShipment();
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [triggerRecentClassifiedShipment]);

	const newEmailData = [];
	if ((recentClassifiedShipmentApi?.data?.body || []).length) {
		(recentClassifiedShipmentApi?.data?.body || []).forEach((child) => {
			if (Object.keys(keyMappings).includes(child.entity_type)) {
				newEmailData.push({
					...child,
					entity_type: keyMappings[child.entity_type],
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

export default useShipmentEmails;
