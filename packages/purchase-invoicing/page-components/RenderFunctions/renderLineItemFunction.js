import { AsyncSelectController, InputController, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import options from '../../common/currencies';
import { UNIT_OPTIONS } from '../../constants';

import styles from './styles.module.css';

const handleModifiedOptions = ({ options: newOptions }) => newOptions.map((option) => ({
	...option,
	actualname : option?.item_name,
	item_name  : (
		<div className={styles.paddingname}>
			<span className={styles.itemname}>
				{option?.item_name || ''}
				(
				{option?.code || ''}
				)-
				{option?.tax_percent || ''}
				%
			</span>
			<div>
				<span className={styles.product}>
					{option?.product_code || ''}
					{' '}
					-
				</span>
				<span className={styles.product}>
					{option?.sac_code || ''}
				</span>
			</div>
		</div>
	),
	code: option?.code,
}));

export const renderLineItemFunctions = {
	container_number: ({ control, index, setCodes, errors, shipmentId }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.container_number`}
				placeholder="Cont. Num"
				asyncKey="shipment_container_details"
				params={{
					filters: {
						shipment_id: shipmentId,
					},
				}}
				onChange={(_, obj) => (setCodes((codes) => ({ ...codes, [obj?.code]: obj })))}
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.container_number ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
		</div>
	),
	code: ({ control, index, extradata, setCodes, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.code`}
				placeholder="Enter"
				asyncKey="search_products_v2"
				getModifiedOptions={handleModifiedOptions}
				params={{
					organization_id         : extradata?.organization_id,
					organization_billing_id : extradata?.organization_billing_id,
					entity_id               : extradata?.entity_id,
					organization_trade_party_detail_id:
                        extradata?.organization_trade_party_detail_id,
					filters: {
						service_names: isEmpty(extradata?.serviceNames)
							? [extradata?.shipment_type] : extradata?.serviceNames,
						invoicing_type: 'PURCHASE',
					},
				}}
				onChange={(_, obj) => (setCodes((codes) => ({ ...codes, [obj?.code]: obj })))}
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.code ? (
				<div className={styles.errors}>
					Code is Required
				</div>
			) : null}
		</div>
	),
	currency: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft}`}>
			<SelectController
				control={control}
				name={`line_items.${index}.currency`}
				placeholder="currency"
				options={options}
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.currency ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
		</div>
	),
	rate: ({ control, index, errors }) => (
		<div className={`${styles.inputcontainer} ${styles.paddingleft}`}>
			<InputController
				name={`line_items.${index}.rate`}
				control={control}
				placeholder="Rate"
				rules={{ required: true }}
				type="number"
			/>
			{errors?.line_items?.[index]?.rate ? (
				<div className={styles.errors}>
					Rate is Required
				</div>
			) : null}
		</div>
	),
	unit: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidthmd}`}>
			<SelectController
				name={`line_items.${index}.unit`}
				control={control}
				placeholder="Unit"
				options={UNIT_OPTIONS}
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.unit ? (
				<div className={styles.errors}>
					Unit is Required
				</div>
			) : null}
		</div>
	),
	quantity: ({ control, index, errors }) => (
		<div className={`${styles.inputcontainer} ${styles.paddingleft}`}>
			<InputController
				name={`line_items.${index}.quantity`}
				control={control}
				placeholder="Quantity"
				rules={{ required: true }}
				type="number"
			/>
			{errors?.line_items?.[index]?.quantity ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
		</div>
	),
	tax_amount: ({ index, calculatedValues }) => (
		<div className={`${styles.text} ${styles.paddingleft}`}>
			{calculatedValues?.[index]?.tax_amt || '--'}
		</div>
	),
	exchange_rate: ({ control, index, errors }) => (
		<div className={`${styles.inputcontainer} ${styles.paddingleft}`}>
			<InputController
				name={`line_items.${index}.exchange_rate`}
				control={control}
				placeholder="Ex. Rate"
				disabled
				rules={{ required: true }}
				type="number"
			/>
			{errors?.line_items?.[index]?.exchange_rate ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
		</div>
	),
	cost: ({ index, calculatedValues }) => (
		<div className={`${styles.text} ${styles.paddingleft}`}>
			{calculatedValues?.[index]?.cost?.toFixed(2) || '--'}
		</div>
	),
	delete: ({ index, remove, showDelete }) => (
		<span className={styles.delete}>
			{showDelete ? (
				<IcMDelete
					className={styles.pointer}
					height={20}
					width={20}
					onClick={() => remove(index)}
				/>
			) : null}
		</span>
	),
};
