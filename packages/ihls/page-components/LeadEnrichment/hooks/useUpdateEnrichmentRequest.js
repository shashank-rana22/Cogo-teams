import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateEnrichmentRequest = (props) => {
	const { refetch, onClose, requestId } = props;

	const {
		profile: {
			user: {
				id: performed_by_id = '',
			},
		},
	} = useSelector((rdxState) => rdxState);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_enrichment_request',
		method : 'put',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const onUpdate = async (val) => {
		try {
			const payload = {
				enrichment_request_id : requestId,
				performed_by_id,
				enriched_file_url     : val?.upload_question?.finalUrl,
			};

			await trigger({ data: payload });

			Toast.success('File uploaded Successfully');
			refetch();
			onClose();
		} catch (error) {
			Toast.error(error?.response?.data?.detail || getApiErrorString(error.response));
		}
	};

	return {
		onUpdate,
		loading,
		control,
		errors,
		handleSubmit,
	};
};

export default useUpdateEnrichmentRequest;
