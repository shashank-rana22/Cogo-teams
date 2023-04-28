import formatters from '@cogoport/ocean-modules/common/RPASearch/helpers';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useLensRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useRpaMail = ({ mailId, entity_type, format_data = true }) => {
	const [mailLoading, setMailLoading] = useState(false);

	const [mailDataRequest, trigger] = useLensRequest({
		url    : 'shipment_data',
		method : 'GET',
		params : {
			mail_id: mailId,
		},
	}, { manual: true });

	const fetchMailData = useCallback(() => {
		(async () => {
			setMailLoading(true);
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
			setMailLoading(false);
		})();
	}, [trigger]);

	const formatterFunction = formatters[entity_type];
	const newMailData = [];
	if (mailDataRequest?.data) {
		newMailData.push(mailDataRequest?.data);
	}

	const newMailId = [];
	newMailId.push(mailId);
	const newMailSelected = {
		mail_ids : newMailId || [],
		mailData : newMailData || [],
	};
	let formattedData = [];
	if (newMailData.length && format_data) {
		formattedData = formatterFunction(newMailSelected);
	}
	const data = { formatted: formattedData, _meta: newMailSelected };

	useEffect(() => {
		if (mailId) {
			fetchMailData();
		}
	}, [mailId, fetchMailData]);

	return {
		mailLoading,
		fetchMailData,
		data,
	};
};

export default useRpaMail;
