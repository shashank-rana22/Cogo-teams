import { ChipsController } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../../../commons/forms/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function ShippingPreferences({ formProps = {}, primaryService = {} }) {
	const {
		control,
		formState: { errors = {} },
		setValue,
	} = formProps;

	const { shipping_preferences = {} } = primaryService;

	useEffect(() => {
		const {
			sailing_start_date = '',
			sailing_end_date = '',
			agreed_for_partial_shipment = false,
			...restValues
		} = shipping_preferences || {};

		Object.entries(restValues).forEach(([key, value]) => {
			setValue(key, value);
		});

		if (sailing_start_date) {
			setValue('sailing_range', { startDate: new Date(sailing_start_date), endDate: new Date(sailing_end_date) });
		}

		setValue('agreed_for_partial_shipment', agreed_for_partial_shipment ? 'yes' : 'no');
	}, [setValue, shipping_preferences]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>Shipping Preference</div>

			<div className={styles.text}>
				Alternate shipping preference may be considered when your initial option
				is not available. This will help us make a booking for you without
				cancellation
			</div>

			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const { label, type, subControls, name, styles: style } = controlItem;

					if (type === 'price-range') {
						return (
							<div key={name} className={styles.item_container} style={style}>
								<div className={styles.label}>{label}</div>

								<div className={styles.flex}>
									{subControls.map((subControlItem) => {
										const {
											type: subControlType,
											name: subControlName,
											styles: subControlStyle,
										} = subControlItem;

										const SubControlElement = getElementController(subControlType);

										return (
											<div key={subControlName} style={subControlStyle}>
												<SubControlElement
													control={control}
													{...subControlItem}
												/>

												{errors?.[subControlName]?.message ? (
													<div className={styles.error_message}>
														{errors?.[subControlName]?.message}
													</div>
												) : null}
											</div>
										);
									})}
								</div>
							</div>
						);
					}

					const Element = getElementController(type);

					return (
						<div key={name} className={styles.item_container} style={style}>
							<div className={styles.label}>{label}</div>

							<Element {...controlItem} control={control} />

							{errors?.[name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							) : null}
						</div>
					);
				})}

			</div>

			<div className={styles.partial_load}>
				In some rare occasion, we may break the shipment and
				send via different ships, is that okay with you?

				<ChipsController
					style={{ marginLeft: '12px' }}
					control={control}
					name="agreed_for_partial_shipment"
					type="chips"
					options={[
						{ value: 'no', label: 'No' },
						{ value: 'yes', label: 'Yes' },
					]}
					size="lg"
					enableMultiSelect={false}
				/>
			</div>
		</div>
	);
}

export default ShippingPreferences;
