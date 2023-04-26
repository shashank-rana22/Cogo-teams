import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function usePostReUpload({ row = {}, setTableModal = () => {}, refetch = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion_request',
		method : 'POST',
	}, { manual: true });

	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const {
		user: { id: user_id = '' },
	} = user_data;

	const formProps = useForm();

	const { reset } = formProps;

	const onClose = () => {
		setTableModal('');
		reset();
	};

	const onSubmit = async (e) => {
		const {
			partner_id = '', ingestion_type = '',
			partner_user_id = '', description = '', agent_id = '', id = '', account_type = '',
		} = row;

		try {
			const payloadData = {
				ingestion_partner_id : partner_id,
				ingestion_type,
				partner_user_id,
				description,
				agent_id,
				ingestion_request_id : id,
				user_id,
				account_type,
			};

			const payload = Object.entries({
				...payloadData,
				file_url  : e?.re_upload?.finalUrl,
				file_name : e?.re_file_name,
			})
				.filter(([, value]) => (!!value || value === false))
				.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

			await trigger({
				data: payload,
			});
			Toast.success('Re-upload Complete');

			setTableModal('');

			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'Something went wrong');
		}
	};

	return {
		formProps,
		onSubmit,
		loading,
		onClose,
	};
}

export default usePostReUpload;
