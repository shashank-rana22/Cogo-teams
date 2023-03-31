import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useConvertToCp = ({ organization_id, setShowConvertModal, refetchOrgDetails }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/convert_importer_exporter_to_channel_partner',
	}, { manual: true });

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();
	const onCreate = async (values = {}) => {
		try {
			const payload = {
				organization_id,
				portfolio_manager_id : values.portfolio_manager || undefined,
				entity_manager_id    : values.key_account_manager || undefined,
			};

			await trigger({ data: payload });
			Toast.success('Account converted to CP');
			setShowConvertModal(false);
			refetchOrgDetails();
		} catch (err) {
			Toast.error((err?.message));
		}
	};

	return {
		loading,
		onCreate,
		control,
		handleSubmit,
		errors,
	};
};

export default useConvertToCp;
