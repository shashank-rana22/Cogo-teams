import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useTermsAndConditions = (props) => {
	const { status, id, refetch } = props;

	const {
		general: { scope },
	} = useSelector((state) => state);
	console.log('hey');
	const [{ data, loading }, trigger] = useRequest({ method: 'post', scope, url: '/update_terms_and_condition' });

	const onSubmit = async () => {
		try {
			const payload = {
				id,
				status: status === 'active' ? 'inactive' : 'active',
			};

			await trigger({
				data: payload,
			});

			Toast.success('Status updated successfully');
			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useTermsAndConditions;
