import { useHarbourRequest } from '@cogoport/request';

const useCreateEmployeeReaction = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_reaction',
	}, { manual: true });

	const createEmployeeReaction = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
		} catch (error) {
			console.log('err', error);
		}
	};
	console.log(data, 'react-data');

	return { data, loading, createEmployeeReaction };
};

export default useCreateEmployeeReaction;
