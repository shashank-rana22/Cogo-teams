import { Button } from '@cogoport/components';
import { asyncFieldsOrganization, SelectController, useGetAsyncOptions } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

function RenderAddRateForm({
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors,
	register,
}) {
	const options = [
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
				<span className={styles.errors}>
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
					<select id="currency" {...register('currency')}>
						<option value="">Select</option>
						{options.map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</select>
				</div>
				<div className={styles.input_container}>
					<label htmlFor="buy_price">Buy price</label>
					<input id="buy_price" type="number" {...register('buy_price')} placeholder="Enter Buy Price" />
				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="unit">Unit</label>
					<select id="unit" {...register('unit')} placeholder="Unit">
						<option value="">Select</option>
						<option value="per_bl">Per Bl</option>
						<option value="per_container">Per Container</option>
						{/* {options.map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))} */}
					</select>
				</div>

				<div className={styles.input_container}>
					<label htmlFor="quantity">Quantity</label>
					<input
						id="quantity"
						type="number"
						{...register('quantity', { required: true })}
						className="primary sm"
						placeholder="Enter Quantity"
					/>
					{errors.quantity && <span>This field is required</span>}
				</div>
			</div>

			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="price">Price</label>
					<input
						id="price"
						type="text"
						{...register('price', { required: true })}
						className="primary sm"
						placeholder="Enter Price"
					/>
					{errors.price && <span>This field is required</span>}
				</div>

				<div className={styles.input_container}>
					<label htmlFor="sell_price">Sell Price</label>
					<input
						id="sell_price"
						type="text"
						{...register('sell_price', { required: true })}
						className="primary sm"
						placeholder="Enter Sell Price"
					/>
					{errors.sell_price && <span>This field is required</span>}
				</div>
			</div>

			<div className={styles.flex}>
				{serviceProviderController}

				<div className={styles.input_container}>
					<label htmlFor="alias">Alias (Optional)</label>
					<input
						id="alias"
						type="text"
						{...register('alias', { minLength: 3 })}
						placeholder="Enter Alias (Only if required)"
					/>
					{errors.alias && <span>Minimum length is 3 characters</span>}
				</div>
			</div>
		</form>
	);
}

export default RenderAddRateForm;
