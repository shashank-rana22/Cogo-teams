import { Popover } from '@cogoport/components';
import { AsyncSelectController, InputController } from '@cogoport/forms';
import { IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';

import { EMPTY_LINE_ITEMS } from '../../../../../Constants';
import TabController from '../ControlledTab';

import styles from './styles.module.css';

const renderButtons = ({ lineitemvalue, insert, index }) => (
	<div className={styles.flexcol}>
		<div
			className={styles.link}
			role="presentation"
			onClick={() => {
				insert(index + 1, lineitemvalue);
			}}
		>
			Duplicate
		</div>
		<div
			className={styles.link}
			role="presentation"
			onClick={() => {
				insert(index + 1, EMPTY_LINE_ITEMS);
			}}
		>
			Insert
		</div>
	</div>
);

const ACCOUNT_TYPE_MAPPINGS = { AP: 'service_provider', AR: 'importer_exporter' };

const renderTradeParty = (option) => `${option?.legal_business_name || ''} 
- ${option?.registration_number || ''} - ${option?.sage_organization_id || ''}`;

const handleModeChange = ({ index, entityCode, accMode, setValue, getGlCode }) => {
	getGlCode({ index, entityCode, accMode, setValue });
};

const renderGlcode = (item) => (`${item?.accountCode} - ${item?.description} - ${item?.ledAccount}`);

export const renderLineItemFunctions = {

	duplicate: ({ index, watch, insert }) => {
		const lineitemvalue = watch(`line_items.${index}`);
		return (
			<div className={styles.container}>
				<Popover placement="bottom" render={renderButtons({ lineitemvalue, insert, index })}>
					<div className={styles.duplicate}>
						<IcMOverflowDot height={20} width={20} />
					</div>
				</Popover>
			</div>

		);
	},
	entity: ({ control, index, errors, entity }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.entityCode`}
				finalvalue={entity}
				disabled
				asyncKey="list_cogo_entity"
				placeholder="Select Entity"
			/>
			{errors?.line_items?.[index]?.entityCode ? (
				<div className={styles.errors}>
					EntityCode is Required
				</div>
			) : null}
		</div>
	),
	controller: ({ control, index, setValue, entity, getGlCode }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.accMode`}
				placeholder="Select Mode"
				asyncKey="jv_account_mode"
				onChange={(val) => {
					handleModeChange({
						index,
						entityCode : entity,
						accMode    : val,
						setValue,
						getGlCode,
					});
				}}
			/>
		</div>
	),
	gl_code: ({ control, index, errors, watch, entity }) => {
		const accMode = watch(`line_items.${index}.accMode`);
		return (
			<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
				<AsyncSelectController
					control={control}
					name={`line_items.${index}.glCode`}
					placeholder="Select Code"
					renderLabel={(option) => renderGlcode(option)}
					asyncKey="jv_code_master"
					params={{
						accMode,
						entityCode: entity || undefined,
					}}
					rules={{ required: true }}
				/>
				{errors?.line_items?.[index]?.glCode ? (
					<div className={styles.errors}>
						* Required
					</div>
				) : null}
			</div>
		);
	},
	business_partner: ({ control, index, errors, setValue, watch }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.tradePartyId`}
				placeholder="Select Partner"
				asyncKey="list_trade_parties"
				rules={{ required: true }}
				renderLabel={(option) => renderTradeParty(option)}
				params={{
					sage_organization_id_required : true,
					filters                       : {
						status       : 'active',
						account_type : ACCOUNT_TYPE_MAPPINGS[watch(`line_items.${index}.accMode`)] || undefined,
					},
				}}
				onChange={(val, obj) => {
					setValue(`line_items.${index}.sageOrgId`, obj?.sage_organization_id);
				}}
			/>
			<div className={styles.sageid}>
				{watch(`line_items.${index}.sageOrgId`) || ''}
			</div>
			{errors?.line_items?.[index]?.tradePartyId ? (
				<div className={styles.errors}>
					* Required
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

	amount: ({ control, index, errors, watch }) => {
		const type = watch(`line_items.${index}.type`);
		const classname = type === 'DEBIT' ? styles.debit : styles.credit;
		return (
			<div className={`${styles.inputcontainer} ${styles.paddingleft} ${classname}`}>
				<InputController
					name={`line_items.${index}.amount`}
					control={control}
					placeholder="Amount"
					rules={{ required: true }}
					type="number"
				/>
				{errors?.line_items?.[index]?.amount ? (
					<div className={styles.errors}>
						* Required
					</div>
				) : null}
			</div>
		);
	},
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
