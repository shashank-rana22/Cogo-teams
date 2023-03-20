import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { getBankAccountControls } from '../../utils/controls';

const useBankAccount = ({
	filledDetails = {},
	setCurrentStep = () => {},
	setFilledDetails = () => {},
}) => {
	const {
		general: { scope },
	} = useSelector((reduxState) => reduxState);

	const bankAccountControls =	getBankAccountControls({ values: filledDetails.bank_details }) || [];
	const bankAccountFormProps = useForm(bankAccountControls);

	const { setValues } = bankAccountFormProps;

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			bank_details: values,
		}));

		setCurrentStep('documents');
	};

	const getBankAccount = useRequest('get', false, scope)('/get_bank_details');

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await getBankAccount.trigger({
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
		onSubmit,
		onBlurIfscControl,
		bankDetailsLoading: getBankAccount.loading,
		bankAccountControls,
		bankAccountFormProps,
	};
};

export default useBankAccount;
