import { InputController, MobileNumberController, MultiselectController, useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import POC_WORKSCOPE_MAPPING from '../../../../../../contants/POC_WORKSCOPE_MAPPING';
import { convertObjectMappingToArray } from '../../../../../../utils/convertObjectMappingToArray';
import validateMobileNumber from '../../../../../../utils/validateMobileNumber';

import styles from './styles.module.css';

function CreateNewPOC(ref) {
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();
	const workscopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div>
			<form>
				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label>POC Name </label>
						<InputController
							name="name"
							control={control}
							size="sm"
							rules={{ required: { value: true, message: 'POC Name is required' } }}
						/>
						{Error('name')}
					</div>

					<div className={styles.form_item_container}>
						<label>Workscopes</label>
						<MultiselectController
							options={workscopeOptions}
							name="work_scopes"
							control={control}
							size="sm"
							rules={{ required: { value: true, message: 'Workscope is required' } }}
						/>
						{Error('work_scopes')}
					</div>
				</div>

				<div className={styles.email}>
					<label>Email Address</label>
					<InputController
						control={control}
						name="email"
						size="sm"
						rules={{ required: { value: true, message: 'Email is required' } }}
					/>
					{Error('email')}
				</div>

				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label>Mobile Number</label>
						<MobileNumberController
							control={control}
							name="mobile_number"
							size="sm"
							rules={{
								validate: validateMobileNumber,
							}}
						/>
						{Error('mobile_number')}
					</div>

					<div className={styles.form_item_container}>
						<label>Alternate Mobile Number (optional)</label>
						<MobileNumberController control={control} name="alternate_mobile_number" size="sm" />
					</div>
				</div>
			</form>
		</div>
	);
}
export default forwardRef(CreateNewPOC);
