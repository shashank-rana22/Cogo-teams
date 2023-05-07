import { useRequest } from '@cogoport/request';

const useGetBankDetails = ({ setValues }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_bank_details',
	}, { manual: false });

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await trigger({
				params: {
					ifsc_code,
				},
			});
			const bankData = response?.data || {};

			setValues({
				bank_name   : bankData.bank || '',
				branch_name : bankData.branch || '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onBlurIfscControl = ({ code: ifsc_code }) => {
		getBankDetails({ ifsc_code });
	};

	return {
		onBlurIfscControl,
		bankDetailsLoading: loading,
	};
};

export default useGetBankDetails;
