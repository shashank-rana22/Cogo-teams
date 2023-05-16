import { AsyncSelectController, InputController } from '@cogoport/forms';
import { IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';

import TabController from '../ControlledTab';

import styles from './styles.module.css';

export const renderLineItemFunctions = {
	duplicate: () => (
		<div className={styles.duplicate}>
			<IcMOverflowDot height={20} width={20} />
		</div>
	),
	entity: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.entityCode`}
				placeholder="Select Entity"
				asyncKey="list_cogo_entity"
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.entityCode ? (
				<div className={styles.errors}>
					EntityCode is Required
				</div>
			) : null}
		</div>
	),
	controller: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.accMode`}
				placeholder="Select Mode"
				asyncKey="jv_account_mode"
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.accMode ? (
				<div className={styles.errors}>
					Controller is Required
				</div>
			) : null}
		</div>
	),
	gl_code: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.glCode`}
				placeholder="Select Code"
				asyncKey="jv_code_master"
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.glCode ? (
				<div className={styles.errors}>
					Code is Required
				</div>
			) : null}
		</div>
	),
	business_partner: ({ control, index, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.tradePartyId`}
				placeholder="Select Partner"
				asyncKey="list_trade_parties"
				rules={{ required: true }}
			/>
			{errors?.line_items?.[index]?.tradePartyId ? (
				<div className={styles.errors}>
					Business Partner is Required
				</div>
			) : null}
		</div>
	),

	type: ({ control, index, errors }) => (
		<div className={`${styles.inputcontainer} ${styles.paddingleft}`}>
			<TabController name={`line_items.${index}.type`} control={control} />
			{errors?.line_items?.[index]?.type ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
		</div>
	),

	amount: ({ control, index, errors }) => (
		<div className={`${styles.inputcontainer} ${styles.paddingleft}`}>
			<InputController
				name={`line_items.${index}.amount`}
				control={control}
				placeholder="Amount"
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
