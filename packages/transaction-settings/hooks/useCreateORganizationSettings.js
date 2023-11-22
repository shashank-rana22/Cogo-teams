import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../utils/toastApiError';

const useCreateOrganizationSettings = ({
	successMessage = 'Uploaded Successfully',
	refetch = () => {},
	reset = () => {},
}) => {
	const {	profile	} = useSelector((state) => state);
	const { user: { id: userId } } = profile;

	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_setting',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (values) => {
		try {
			const payload = {
				organization_id  : values?.organization_id,
				setting_type     : 'pass_through',
				status           : 'approved',
				approved_by_id   : userId || undefined,
				rejection_reason : '',
				setting_config   : {
					agreement_url       : values?.agreement_url?.finalUrl,
					validity_start_date : values?.validity_start_date,
					validity_end_date   : values?.validity_end_date,
					remarks             : values?.remarks,
				},
			};

			const res = await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
			reset();
			return res;
		} catch (err) {
			toastApiError(err);
			return {};
		}
	};

	return {
		loading, apiTrigger,
	};
};

export default useCreateOrganizationSettings;
