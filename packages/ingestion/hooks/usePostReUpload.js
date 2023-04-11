import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function usePostReUpload({ row = {}, setTableModal = () => {} }) {
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
			partner_id = '', country_id = '', ingestion_type = '',
			partner_user_id = '', description = '', agent_id = '', id = '', request_files = {},
		} = row;

		try {
			const pay = {
				partner_id,
				country_id,
				performed_by_type    : 'agent',
				ingestion_type,
				partner_user_id,
				description,
				agent_id,
				ingestion_request_id : id,
				file_name            : request_files?.sheet_name,
				user_id,
			};

			const payload = Object.entries({ ...pay, file_url: e?.re_upload?.finalUrl })
				.filter(([, value]) => value !== null && value !== '')
				.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

			await trigger({
				data: payload,
			});
			Toast.success('Re-upload Complete');

			setTableModal('');
		} catch (error) {
			Toast.error(error?.message);
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
