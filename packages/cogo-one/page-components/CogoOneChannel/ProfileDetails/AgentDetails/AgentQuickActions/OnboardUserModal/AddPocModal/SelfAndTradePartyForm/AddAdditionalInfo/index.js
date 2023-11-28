import {
	CreatableSelectController,
	InputController,
	MobileNumberController,
	MultiselectController,
} from '@cogoport/forms';

import POC_WORKSCOPE_MAPPING from '../../constants/POC_WORKSCOPE_MAPPING';
import getCompanyAddressOptions from '../../helpers/getCompanyAddressOptions';
import { convertObjectMappingToArray } from '../../utils/convertObjectMappingToArray';

import styles from './styles.module.css';

function AddAddtionalInfo({
	Error = () => {},
	control = {},
	errors = {},
	tradeParty = {},
}) {
	const address_options = getCompanyAddressOptions(tradeParty);
	const workScopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);
	return (
		<>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Select Address</label>
					<CreatableSelectController
						size="xs"
						name="address"
						placeholder="Select Address"
						control={control}
						options={address_options}
					/>
					{Error('address', errors)}
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Pincode / Zip Code</label>
					<InputController
						control={control}
						name="pincode"
						placeholder="Enter Pincode"
						size="xs"
					/>
					{Error('pincode', errors)}
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>
						PAN Number / Registration Number
					</label>
					<InputController
						size="xs"
						name="registration_number"
						control={control}
						placeholder="Enter Registration Number"
					/>
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Workscopes</label>
					<MultiselectController
						size="xs"
						control={control}
						name="work_scopes"
						placeholder="Choose workscope Type"
						options={workScopeOptions}
					/>
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>
						Alternate Mobile Number (optional)
					</label>
					<MobileNumberController
						size="xs"
						control={control}
						name="alternate_mobile_number"
					/>
				</div>
			</div>
		</>
	);
}

export default AddAddtionalInfo;
