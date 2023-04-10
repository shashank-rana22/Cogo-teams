import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

import getDefaultFeedbackMonth from '../../../../utils/getDefaultYearMonth';

const useNotifyManagers = ({ setModal = () => {} }) => {
	const { feedbackMonth, feedbackYear } = getDefaultFeedbackMonth();

	const [sendToAll, setSendToAll] = useState(false);
	const [{ loading = false, data = {} }, trigger] = useIrisRequest({
		url    : 'post_iris_notify_managers',
		method : 'post',
	}, { manual: true });

	const notify = async () => {
		try {
			await trigger({
				data: {
					Year  : feedbackYear,
					Month : feedbackMonth,
				},
			});
			const { manager_count } = data;

			setModal('');
			Toast.success(`${manager_count} Managers Notified...`);
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { notify, loading, data, setSendToAll, sendToAll };
};

export default useNotifyManagers;
