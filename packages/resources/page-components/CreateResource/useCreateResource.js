import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAuthRequest } from '@cogoport/request';

const useCreateResource = ({ reset = () => {} }) => {
	const router = useRouter();

	const [{ loading = false }, trigger] = useAuthRequest({
		method : 'POST',
		url    : 'create_resource',
	}, { manual: true });

	const onSubmit = async (values) => {
		try {
			await trigger({
				data: { ...values },
			});

			Toast.success('Added Successfully! Returning to list page...');
			reset();
			router.push('/resources');
		} catch (err) {
			Toast.error(err.response?.data.error || 'Unable to create, please try again');
		}
	};

	const onReset = () => {
		reset();
	};

	return { onSubmit, onReset, loading };
};

export default useCreateResource;
