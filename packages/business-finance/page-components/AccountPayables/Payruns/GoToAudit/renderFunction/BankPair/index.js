import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function BankPair({ item = {} }) {
	const { bankDetails = [] } = item || {};
	const {
		beneficiary_name = '',
		account_number = '',
		ifsc_code = '',
	} = bankDetails?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	if (isEmpty(bankDetails)) {
		return null;
	}
	return (
		<div>
			<div className={styles.text_container}>
				<div className={styles.text}>Name: </div>
				{beneficiary_name}
			</div>
			<div className={styles.text_container}>
				<div className={styles.text}>Acc No: </div>
				{account_number}
			</div>
			<div className={styles.text_container}>
				<div className={styles.text}>IFSC:</div>
				{' '}
				{ifsc_code}
			</div>
		</div>
	);
}

export default BankPair;
