import { useRequest } from '@cogoport/request';

const useBankDetails = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_bank_details',
		method : 'get',
	});

	return {
		loading,
		trigger,
	};
};

export default useBankDetails;
