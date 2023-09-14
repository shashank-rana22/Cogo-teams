import { useRequest } from '@cogoport/request';

const getPayload = () => {

};

const useCreateBulkCogooneShift = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const createCogooneShift = ({ formattedValues, prevList: list }) => {
		try {
			trigger({ data: getPayload({ formattedValues, prevList: list }) });
		} catch (e) {
			console.error(e);
		}
	};

	return {
		createCogooneShift,
		loading,
	};
};
export default useCreateBulkCogooneShift;
