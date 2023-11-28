import { InputController, MobileNumberController } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import FORM_VALUE_PATTERNS from '../../utils/formValuePatterns';

import styles from './styles.module.css';

function PocDetails({
	mobileNumber = '',
	Error = () => {},
	control = {},
	errors = {},
	userEmail = '',
	username = '',
	mobileCountryCode = '',
	watch = {},
}) {
	const { email = '', mobile_number = {} } = watch() || {};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>POC Name</label>
					<InputController
						size="xs"
						control={control}
						name="name"
						placeholder="Enter your POC Name"
						value={username}
						rules={{
							required: {
								value   : true,
								message : 'Name is Required',
							},
						}}
					/>
				</div>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Email Address</label>
					<InputController
						name="email"
						control={control}
						size="xs"
						rules={{
							pattern: {
								value   : FORM_VALUE_PATTERNS.EMAIL,
								message : 'Enter valid Email',
							},
							required: {
								value   : isEmpty(mobile_number?.number) || isEmpty(mobile_number?.country_code),
								message : 'Email or Mobile is Required',
							},
						}}
						placeholder="Enter Email Address"
						defaultValue={userEmail}
					/>
					{Error('email', errors)}
				</div>
			</div>
			<div className={styles.row}>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Mobile Number</label>
					<MobileNumberController
						size="xs"
						control={control}
						name="mobile_number"
						value={{
							number       : mobileNumber,
							country_code : `+${mobileCountryCode}`,
						}}
						rules={{
							required: {
								value   : isEmpty(email),
								message : 'Email or Mobile is Required',
							},
						}}
					/>
					{Error('mobile_number', errors)}
				</div>
			</div>
		</>

	);
}

export default PocDetails;
