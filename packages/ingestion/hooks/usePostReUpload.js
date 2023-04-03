import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

function usePostReUpload({ row = {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_ingestion',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async () => {
		try {
			// Todo write trigger condition
			// trigger()
			console.log('row', row);
			Toast.success('Re-upload Complete');
		} catch (error) {
			console.log('error', error);
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
