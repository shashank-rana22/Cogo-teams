import { InputController, MobileNumberController } from '@cogoport/forms';

import FORM_VALUE_PATTERNS from '../../utils/formValuePatterns';

import styles from './styles.module.css';

function PocDetails({
	mobileNumber = '',
	Error = () => {},
	control = {},
	errors = {},
	email = '',
	username = '',
	mobileCountryCode = '',
}) {
	return (
		<>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>POC Name</label>
					<InputController
						size="sm"
						control={control}
						name="name"
						placeholder="Enter your POC Name"
						value={username}
					/>
				</div>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Email Address</label>
					<InputController
						name="email"
						control={control}
						size="sm"
						rules={{
							pattern: {
								value   : FORM_VALUE_PATTERNS.EMAIL,
								message : 'Enter valid Email',
							},
							required: { value: true, message: 'Email is Required' },
						}}
						placeholder="Enter Email Address"
						defaultValue={email}
					/>
					{Error('email', errors)}
				</div>
			</div>
			<div className={styles.row}>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Mobile Number</label>
					<MobileNumberController
						size="sm"
						control={control}
						name="mobile_number"
						value={{
							number       : mobileNumber,
							country_code : `+${mobileCountryCode}`,
						}}
						rules={{
							required: { value: true, message: 'Mobile is Required' },
						}}
					/>
					{Error('mobile_number', errors)}
				</div>
			</div>
		</>

	);
}

export default PocDetails;
