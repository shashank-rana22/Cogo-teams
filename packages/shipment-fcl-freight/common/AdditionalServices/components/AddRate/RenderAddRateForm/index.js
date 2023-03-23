import { asyncFieldsOrganization, SelectController, useGetAsyncOptions, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

function RenderAddRateForm({
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors,
	unitOptions = [],
}) {
	const currencyOptions = [
		GLOBAL_CONSTANTS.currency_code.INR,
		GLOBAL_CONSTANTS.currency_code.USD,
		GLOBAL_CONSTANTS.currency_code.EUR,
		GLOBAL_CONSTANTS.currency_code.GBP,
	].map((currency) => ({
		label : currency,
		value : currency,
	}));

	const serviceProviderInitalControl = {
		name        : 'service_provider_id',
		label       : 'Service provider',
		type        : 'select',
		span        : 8,
		placeholder : 'Select Service Provider',
		rules       : { required: 'Service Provider is required' },
	};

	const serviceProviderEmbededOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganization(), {
			params: {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					// service:
					// 	serviceData?.[0]?.service_type === 'rail_domestic_freight_service'
					// 		? serviceData?.[0]?.service_type?.split('_', 3)?.join('_')
					// 		: serviceData?.[0]?.service_type?.split('_', 2)?.join('_'),
				},
			},
		}),
	);

	const newServiceProviderControl = { ...serviceProviderInitalControl, ...serviceProviderEmbededOptions };

	const serviceProviderController = (
		<div>
			<div>
				Service Provider
			</div>
			<SelectController
				{...newServiceProviderControl}
				name="service_provider_id"
				control={control}
				errors={errors}
			/>
			{errors.service_provider_id && (
				<span>
					{errors.service_provider_id.message}
				</span>
			)}
		</div>
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="currency">Currency</label>
					<SelectController
						name="currency"
						control={control}
						size="sm"
						options={currencyOptions}
						rules={{ required: { value: true, message: 'Currency is required' } }}
					/>
					{errors.currency && <span>This field is required</span>}
				</div>
				<div className={styles.input_container}>
					<label htmlFor="buy_price">Buy price</label>
					<InputController
						name="buy_price"
						control={control}
						size="sm"
						rules={{ required: { value: true, message: 'Buy Price is required' } }}
					/>
					{errors.buy_price && <span>This field is required</span>}
				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="unit">Unit</label>
					<SelectController
						name="unit"
						control={control}
						size="sm"
						options={unitOptions}
						rules={{ required: { value: true, message: 'Unit is required' } }}
					/>
					{errors.unit && <span>This field is required</span>}
				</div>

				<div className={styles.input_container}>
					<label htmlFor="quantity">Quantity</label>
					<InputController
						name="quantity"
						control={control}
						size="sm"
						placeholder="Enter quantity here"
						rules={{ required: { value: true, message: 'Buy Price is required' } }}
					/>
					{errors.quantity && <span>This field is required</span>}
				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="price">Price</label>
					<InputController
						name="price"
						control={control}
						size="sm"
						placeholder="Enter price here"
						rules={{ required: { value: true, message: 'Price is required' } }}
					/>
					{errors.price && <span>This field is required</span>}
				</div>

				<div className={styles.input_container}>
					<label htmlFor="sell_price">Sell Price</label>
					<InputController
						name="sell_price"
						control={control}
						size="sm"
						placeholder="Enter Sell Price"
						rules={{ required: { value: true, message: 'Price is required' } }}
					/>
					{errors.sell_price && <span>This field is required</span>}
				</div>
			</div>

			<div className={styles.flex}>
				{serviceProviderController}
				<div className={styles.input_container}>
					<label htmlFor="alias">Alias (Optional)</label>
					<InputController
						name="alias"
						control={control}
						size="sm"
						placeholder="Enter Alias (Only if required)"
					/>
				</div>
			</div>
		</form>
	);
}

export default RenderAddRateForm;
