import { useHarbourRequest } from '@cogoport/request';

const useCreateEmployeeReaction = () => {
	const [{ loading }, trigger] = useHarbourRequest({
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

	return { loading, createEmployeeReaction };
};

export default useCreateEmployeeReaction;
