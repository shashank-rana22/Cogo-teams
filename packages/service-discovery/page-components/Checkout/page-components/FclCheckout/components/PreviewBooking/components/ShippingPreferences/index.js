// import { Checkbox } from '@cogoport/components';  //commented for now, may use in future
import { Popover } from '@cogoport/components';
import { ChipsController } from '@cogoport/forms';
import { useEffect } from 'react';

import InfoBannerContent from '../../../../../../../../common/InfoBannerContent';
import getElementController from '../../../../../../commons/forms/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

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
	setInfoBanner = () => {},
	infoBanner = {},
}) {
	const {
		control,
		formState: { errors = {} },
		setValue,
	} = formProps;

	const controls = getControls({ search_id });

	const { shipping_preferences = {} } = primaryService;

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

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
		<div className={styles.container} id="shipping_preferences">
			<Popover
				placement="bottom"
				caret
				visible={current === 'shipping_preferences'}
				render={(
					<InfoBannerContent
						popoverComponentData={buttonProps.shipping_preferences || {}}
						totalBanners={totalBanners}
						setInfoBanner={setInfoBanner}
						guideKey="preview_booking_guide_completed_for"
						nextGuide="additional_services"
						prevGuide="cargo_details"
					/>
				)}
			>
				<div className={styles.header}>Shipping Preference</div>
			</Popover>

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
