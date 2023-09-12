import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	CreatableSelectController,
	InputController, MobileNumberController,
	TextAreaController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';

import useCreateAutoUpsellService from '../../../../../../hooks/useCreateAutoUpsellService';
import useListOrganizations from '../../../../../../hooks/useListOrganizations';

import styles from './styles.module.css';

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

const COUNTRY = 'IND';

function BillingAddress({ task = {}, refetch = () => {}, orgId = '' }) {
	const { loading = false, listData = {} } = useListOrganizations({ orgId });

	// const { control, formValues, reset, formState:{ errors = {} }, handleSubmit } = useForm();
	const { control, formValues, formState:{ errors = {} }, handleSubmit } = useForm();

	console.log({ listData });

	const {
		onSubmit = () => {},
		loading: upsellLoading = false,
	} = useCreateAutoUpsellService({ task, refetch });

	const countryValidation = getCountryConstants({
		country_id    : formValues?.country_id,
		isDefaultData : false,
	});

	// useEffect(() => {
	// 	const NEW_DEFAULT_VALUES = {
	//		business_name: listData?.business_name,
	//		pincode: listData?.pincode_id,
	//		tax_number:listData?. ,
	//		address:listData?.address ,
	//		tax_number_document_url:listData?. ,
	//		name:listData?. ,
	//		email:listData?. ,
	//		mobile_number:listData?. ,
	// 	};

	// 	reset(NEW_DEFAULT_VALUES);
	// }, [reset]);

	return (
		<div className={styles.main_container}>
			<div className={styles.form_container}>
				<div className={styles.first_container}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Company Name</label>

						<InputController
							name="business_name"
							control={control}
							size="sm"
							rules={{ required: 'Company Name is required' }}
							placeholder="Enter Company Name"
						/>
						{Error('business_name', errors)}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Pincode / Zip Code</label>

						<AsyncSelectController
							size="sm"
							control={control}
							name="pincode"
							asyncKey="list_locations"
							rules={{ required: 'Pincode is required' }}
						/>
						{Error('pincode', errors)}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>GST Number</label>

						<InputController
							size="sm"
							name="tax_number"
							control={control}
							rules={{
								pattern: {
									value   : countryValidation?.regex?.TAX,
									message : 'Tax Number is Invalid',
								},
							}}
						/>
						{Error('tax_number', errors)}
					</div>
				</div>

				<div className={styles.address_container}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Address</label>

						<TextAreaController
							control={control}
							name="address"
							rows={3}
							placeholder="Enter Address"
							rules={{ required: 'Address is required' }}
						/>
						{Error('address', errors)}
					</div>

					<div className={styles.sub_container}>
						<label className={styles.form_label}>{`Is your Address ${COUNTRY} ?`}</label>
						<div>
							<Button themeType="secondary">Yes</Button>
							<Button themeType="secondary">No</Button>
						</div>
					</div>

				</div>

				<div className={styles.upload_container}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>
							{/* {taxLabel} */}
							{' '}
							Proof
						</label>

						<UploadController
							className="tax_document"
							name="tax_number_document_url"
							disabled={formValues?.not_reg_under_gst}
							control={control}
							rules={{
								required: {
									value: !formValues?.not_reg_under_gst,
								// message : `${taxLabel} Proof is required`,
								},
							}}
						/>
						{Error('tax_number_document_url', errors)}
					</div>
				</div>

				<div className={styles.first_container}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>POC Name</label>
						<CreatableSelectController
							size="sm"
							control={control}
							name="name"
							placeholder="Enter your POC Name"
						/>
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Mobile Number</label>
						<MobileNumberController
							size="sm"
							control={control}
							name="mobile_number"
							styles={{ flex: '1 1 10%' }}
							rules={{
								pattern: {
									value   : countryValidation?.regex?.MOBILE_NUMBER,
									message : 'Mobile Number is Invalid',
								},
							}}
						/>
						{Error('mobile_number', errors)}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Email</label>
						<InputController
							size="sm"
							control={control}
							name="email"
							rules={{
								required : 'Email is required',
								pattern  : {
									value   : countryValidation?.regex?.EMAIL,
									message : 'Enter Valid Email Address',
								},
							}}
						/>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button disabled={upsellLoading || loading} onClick={handleSubmit(onSubmit)}>
					Save
				</Button>
			</div>
		</div>
	);
}

export default BillingAddress;
