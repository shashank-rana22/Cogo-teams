import { Button } from '@cogoport/components';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { isEmpty } from '@cogoport/utils';

import Spinner from '../../../../../../../../Spinner';

import useAddressForm from './hooks/useAddressForm';
import Layout from './Layout';
import styles from './styles.module.css';

function AddressForm(props) {
	const {
		submitButtonLabel,
		optionalButtons,
		loading,
		organizationCountryId,
		...restProps
	} = props;

	const {
		loading: apiLoading,
		layouts,
		formProps,
		errors,
		onSubmit,
		getFormattedValues,
		getBusinessApi,
		getCogoScoreTaxNumApi,
		watchPincode,
		watchGstList,
		isAddressRegisteredUnderGstChecked,
	} = useAddressForm({ ...restProps, organizationCountryId });

	const { handleSubmit, fields, control } = formProps;

	if (getCogoScoreTaxNumApi.loading) {
		return (
			<div className={styles.spinner_container}>
				<Spinner
					size={40}
					borderWidth={4}
					outerBorderColor="#f2f6ff"
					spinBorderColor="#393f70"
				/>
				<div className={styles.loading_text}>Kindly wait, fetching relevant information...</div>
			</div>
		);
	}

	return (
		<div className={styles.container} key={`${watchPincode}_${watchGstList}`}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.main_container}>
					{Object.entries(layouts).map(([key, layout]) => {
						const { title, controls, showElements } = layout;

						if (isEmpty(controls)) {
							return null;
						}

						console.log('controls', controls);

						return (
							<div className={styles.flex_column} key={key}>
								{title && (
									<div className={styles.text}>
										{title}
									</div>
								)}

								<Layout
									key={`${key}__${getBusinessApi.loading}`}
									fields={fields}
									errors={errors}
									control={control}
									showElements={showElements || {}}
									controls={controls}
								/>

								{key === 'registeredUnderGst'
									&& isAddressRegisteredUnderGstChecked && (
										<div className={styles.warn_text}>
											Addresses not registered under
											{' '}
											<CountrySpecificData
												country_id={organizationCountryId}
												accessorType="registration_number"
												accessor="label"
											/>
											{' '}
											will be added in &quot;Other Addresses&quot; for the
											organisation and
											{' '}
											<b>
												will not be available for
												{' '}
												<CountrySpecificData
													country_id={organizationCountryId}
													accessorType="registration_number"
													accessor="label"
												/>
												{' '}
												Invoicing
											</b>
											.
										</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={styles.btn_grp}>
					{(optionalButtons || []).map((optionButton) => {
						const { label, onClick } = optionButton;

						return (
							<Button
								key={label}
								type="button"
								themeType="secondary"
								disabled={loading || apiLoading}
								onClick={(event) => {
									onClick?.({
										event,
										values: getFormattedValues(),
									});
								}}
								style={{ marginRight: '16px' }}
							>
								{label}
							</Button>
						);
					})}

					<Button
						type="submit"
						className="primary md"
						disabled={loading || apiLoading}
						themeType="accent"
					>
						{submitButtonLabel || 'Submit'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddressForm;
