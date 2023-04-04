import { Toast } from '@cogoport/components';
import useAxios from 'axios-hooks';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const keyMappings = {
	shipping_instruction: 'si',
};

const useShipmentEmails = ({ cogo_shipment_id, document_type = [], page }) => {
	const [recentClassifiedShipmentApi, triggerRecentClassifiedShipment] =	useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/list_rpa_mails`,
			method : 'GET',
		},
		{ manual: true },
	);

	const getShipmentEmails = useCallback(() => {
		(async () => {
			try {
				await triggerRecentClassifiedShipment({
					params: {
						filters: {
							cogo_shipment_id,
							entity_type: document_type.length ? document_type : undefined,
						},
						page_no    : page,
						page_limit : 10,
					},
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [cogo_shipment_id, document_type, page, triggerRecentClassifiedShipment]);

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

	useEffect(() => {
		if ((document_type || []).length || page) {
			getShipmentEmails();
		}
	}, [JSON.stringify(document_type), page, getShipmentEmails]);

	return {
		emailList : newEmailData,
		loading   : recentClassifiedShipmentApi?.loading,
		total_count:
			recentClassifiedShipmentApi?.data?.pagination_data?.total_count,
	};
};

export default useShipmentEmails;
// TODO
