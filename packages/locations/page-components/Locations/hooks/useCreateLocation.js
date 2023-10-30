import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

import getPayload from '../helpers/getFormattedValue';
import toastApiError from '../utils/toastApiError';

const useCreateLocation = ({ refetch = () => {} }) => {
	const { t } = useTranslation(['locations']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_location',
		method : 'post',
	}, { manual: true });

	const onCreate = async ({ values }) => {
		const payload = getPayload({ values });

		try {
			const res = await trigger({ data: payload });

			if (res?.data) {
				Toast.success(t('locations:location_created_successfully'));
			}
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		onCreate,
	};
};

export default useCreateLocation;
