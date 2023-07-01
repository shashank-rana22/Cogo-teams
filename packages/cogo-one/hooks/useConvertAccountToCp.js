import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useConvertAccountToCp = ({ organization_id, setShowConvertModal, refetchOrgDetails }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/convert_importer_exporter_to_channel_partner',
	}, { manual: true });

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	const convertToAccountCp = async ({ portfolio_manager = '', key_account_manager = '' }) => {
		try {
			const payload = {
				organization_id,
				portfolio_manager_id : portfolio_manager || undefined,
				entity_manager_id    : key_account_manager || undefined,
			};

			await trigger({ data: payload });
			Toast.success('Account converted to CP');
			setShowConvertModal(false);
			refetchOrgDetails();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		convertToAccountCp,
		control,
		handleSubmit,
		errors,
	};
};

export default useConvertAccountToCp;
