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
			console.log(err);
		}
	};

	return { data, listOperator, loading };
};

export default GetOperator;
