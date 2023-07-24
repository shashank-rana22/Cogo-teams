import getElementController from '../../../../../../commons/forms/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function ShippingPreferences({ formProps = {} }) {
	const {
		control,
		handleSubmit,
		formState: { errors = {} },
	} = formProps;

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
		</div>
	);
}

export default ShippingPreferences;
