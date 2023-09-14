// import { Checkbox } from '@cogoport/components';  //commented for now, may use in future
import { ChipsController, InputNumberController } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../../../commons/forms/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

const MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT = 2;
const ONE = 1;

function ShippingLineLabel({
	label = '',
	name = '',
	// setIsAllShippingLinesRequired = () => {},
	// isAllShippingLinesRequired = false,
	// updateLoading = false,
}) {
	if (name !== 'preferred_shipping_line_ids') {
		return <div className={styles.label}>{label}</div>;
	}

	return (
		<div className={styles.flex_row}>
			<div className={styles.label}>{label}</div>
			{/*
			<Checkbox
				checked={isAllShippingLinesRequired}
				onChange={() => {
					setIsAllShippingLinesRequired((prev) => !prev);
				}}
				label="All"
				loading={updateLoading}
			/> */}
		</div>
	);
}

function ShippingPreferences({
	formProps = {},
	primaryService = {},
	search_id = '',
	updateLoading = false,
	totalContainerCount = 1,
}) {
	const {
		control,
		formState: { errors = {} },
		setValue,
		watch,
	} = formProps;

	const controls = getControls({ search_id });

	const { shipping_preferences = {} } = primaryService;

	useEffect(() => {
		const {
			sailing_start_date = '',
			sailing_end_date = '',
			...restValues
		} = shipping_preferences || {};

		const { partial_shipment_min_limit = 0 } = restValues || {};

		Object.entries(restValues).forEach(([key, value]) => {
			setValue(key, value);
		});

		if (sailing_start_date) {
			setValue('sailing_range', { startDate: new Date(sailing_start_date), endDate: new Date(sailing_end_date) });
		}

		setValue('agreed_for_partial_shipment', partial_shipment_min_limit ? 'yes' : 'no');
	}, [setValue, shipping_preferences]);

	const agreedForPartialShipmentWatch = watch('agreed_for_partial_shipment');

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
							<ShippingLineLabel
								name={name}
								updateLoading={updateLoading}
								label={label}
							/>

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

			{totalContainerCount >= MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT ? (
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
			) : null}

			{agreedForPartialShipmentWatch === 'yes'
			&& totalContainerCount >= MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT && (
				<div className={styles.partial_load} style={{ marginTop: '16px' }}>
					How many minimum containers would you like to ship in one go?

					<InputNumberController
						style={{ marginLeft: '12px' }}
						control={control}
						name="partial_shipment_min_limit"
						size="sm"
						max={totalContainerCount - ONE}
						min={1}
					/>
				</div>
			)}
		</div>
	);
}

export default ShippingPreferences;
