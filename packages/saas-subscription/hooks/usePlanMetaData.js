import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const usePlanMetaData = ({ metaData, setMetaData, setFeatureModal }) => {
	const { t } = useTranslation(['saasSubscription']);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_plan',
	}, { manual: true });

	const closeModalHandler = () => {
		setMetaData({ open: false });
	};

	const editMetaDataHandler = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Updated Meta Data');
			setFeatureModal({ apiCall: true });
			closeModalHandler();
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	const submitHandler = (val) => {
		try {
			const validJson = JSON.parse(val);
			editMetaDataHandler({ payload: { id: metaData?.id, metadata: validJson } });
		} catch (e) {
			Toast.error(t('saasSubscription:valid_json'));
		}
	};

	return { loading, submitHandler, closeModalHandler };
};

export default usePlanMetaData;
