import { DatepickerController, InputController, SelectController } from '@cogoport/forms';
import React, { useRef, useEffect } from 'react';

import getElementController from '../../../../../configs/getElementController';
import { getUnit } from '../../../utils/get-unit';

import PortSelect from './PortSelect';
import styles from './styles.module.css';

function CreateContractModal({
	control,
	errors,
	controls,
	watchForm,
	setValue,
	search_type,
}) {
	const startDate = watchForm?.validity_start;

	useEffect(() => {
		setValue('validity_end', '');
	}, [setValue, startDate]);

	return (
		<div className={styles.control_container}>

			{controls.map((controlItem) => {
				const { style, ...rest } = controlItem;
				const Element = getElementController(controlItem.type);

				if (!controlItem.showIn.includes(search_type)) {
					return null;
				}

				return (
					<div key={controlItem.name} style={style} className={styles.control_div}>
						<div className={styles.label}>
							{controlItem.label}
						</div>
						<Element control={control} {...rest} />
					</div>
				);
			})}

			{/* <div>
				<div>
					<div>{controls.contract_name.label}</div>
					<div>Name</div>
					<InputController {...controls.contract_name} control={control} />
					<div>{errors?.contract_name?.message}</div>
				</div>
			</div>

			<div>
				<div>
					<div>
						Validity
						{' '}
						<span>(Max 30 Days)</span>
					</div>
					<div>Start Date</div>
					<DatepickerController
						{...controls.validity_start}
						minDate={new Date()}
						maxDate={addDays(new Date(), 29)}
						control={control}
					/>
					<div>{errors?.validity_start?.message}</div>
				</div>

				<div className="end-date">
					<div>End Date</div>
					<DatepickerController
						{...controls.validity_end}
						theme="admin"
						minDate={startDate}
						maxDate={addDays(startDate, 29)}
						disabled={!startDate}
						control={control}
					/>
					<div>{errors?.validity_end?.message}</div>
				</div>
			</div>

			<div>
				<div>
					<div>{label}</div>
					<div>{label}</div>
					<InputController {...input} min={50} control={control} />
					<div>
						{error && `Min ${getUnit(search_type)} is 50`}
					</div>
				</div>
			</div>

			{search_type !== 'lcl_freight' && (
				<div>
					<div>
						<div>
							Preferred
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className="shipping-line">(OPTIONAL)</span>
						</div>
						<div>Search</div>
						<SelectController
							{...controls.preferred_shipping_line_ids}
							onFocus={async () => {
								await updateCache('preferred_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('preferred_shipping_line_ids')}
							cacheOptions={getCacheOptions('preferred_shipping_line_ids')}
							optionsListKey={optionsListKey}
							control={control}
						/>
						<div>
							{errors?.preferred_shipping_line_ids?.message}
						</div>
					</div>

					<div>
						<div>
							Exclude
							{' '}
							{shippingLabel}
							{' '}
							lines
							{' '}
							<span className="shipping-line">(OPTIONAL)</span>
						</div>
						<div>Search</div>
						<SelectController
							{...controls.exclude_shipping_line_ids}
							onFocus={async () => {
								await updateCache('exclude_shipping_line_ids');
								await scrollToBottom();
							}}
							{...params('exclude_shipping_line_ids')}
							cacheOptions={getCacheOptions('exclude_shipping_line_ids')}
							optionsListKey={optionsListKey}
							control={control}
						/>
						<div>{errors?.exclude_shipping_line_ids?.message}</div>
					</div>
				</div>
			)} */}

		</div>
	);
}

export default CreateContractModal;
