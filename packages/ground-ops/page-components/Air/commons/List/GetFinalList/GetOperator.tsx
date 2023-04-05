import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const GetOperator = ({ airlineIds }) => {
	const [{ data = {}, loading }, trigger] = useRequest('/list_operators', { manual: true });

	const listOperator = async () => {
		try {
			await trigger({
				params: {
					filters: {
						id: airlineIds,
					},

				},
			});
		} catch (err) {
			if (err?.message !== 'canceled') {
				Toast.error(err?.message || 'Something went wrong');
			}
		}
	};

	return { data, listOperator, loading };
};

export default GetOperator;
