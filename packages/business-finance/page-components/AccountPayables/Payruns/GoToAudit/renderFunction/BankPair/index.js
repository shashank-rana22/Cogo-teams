import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

function BankPair({ item = {} }) {
	const { bankDetails } = item || [];
	const {
		beneficiary_name = '',
		account_number = '',
		ifsc_code = '',
	} = bankDetails?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const isBank = !isEmpty(bankDetails);

	if (isBank) {
		return (
			<div>
				<div>
					Name:
					{beneficiary_name}
				</div>
				<div>
					Acc No:
					{' '}
					{account_number}
				</div>
				<div>
					IFSC:
					{' '}
					{ifsc_code}
				</div>
			</div>
		);
	}
	return null;
}

export default BankPair;
