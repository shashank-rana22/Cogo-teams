import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

function usePostReUpload({ row = {}, setTableModal = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async (e) => {
		try {
			const payload = {
				partner_id           : row?.partner_id,
				country_id           : row?.country_id,
				performed_by_type    : 'agent',
				file_url             : e?.re_upload[0],
				ingestion_type       : row?.ingestion_type,
				partner_user_id      : row?.partner_user_id,
				description          : row?.description,
				agent_id             : row?.agent_id,
				// is_channel_partner   : row?.is_channel_partner,
				ingestion_request_id : row?.id,
				file_name            : row?.request_files[0]?.sheet_name,

			};

			await trigger({
				data: payload,
			});
			Toast.success('Re-upload Complete');

			setTableModal('');
		} catch (error) {
			Toast.error('Error');
		}
	};
	const formProps = useForm();

	return {
		formProps,
		onSubmit,
		loading,

	};
}

export default usePostReUpload;
