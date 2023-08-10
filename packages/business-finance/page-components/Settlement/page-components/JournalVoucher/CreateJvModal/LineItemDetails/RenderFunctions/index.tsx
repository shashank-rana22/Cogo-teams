import { Button, Popover } from '@cogoport/components';
import { AsyncSelectController, InputController } from '@cogoport/forms';
import { IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { EMPTY_LINE_ITEMS } from '../../../../../Constants';
import TabController from '../ControlledTab';

import styles from './styles.module.css';

const renderButtons = ({ lineitemvalue, insert, index }) => (
	<div className={styles.flexcol}>
		<Button
			className={styles.link}
			onClick={() => {
				insert(index + 1, lineitemvalue);
			}}
			style={{ marginBottom: '4px' }}
		>
			Duplicate
		</Button>
		<Button
			className={styles.link}
			onClick={() => {
				insert(index + 1, EMPTY_LINE_ITEMS);
			}}
		>
			Insert
		</Button>
	</div>
);

const ACCOUNT_TYPE_MAPPINGS = { AP: 'service_provider', AR: 'importer_exporter' };

const renderTradeParty = (option) => (
	<div className={styles.tradeparty}>
		<div>{option?.legal_business_name || ''}</div>
		<div>
			<span className={styles.label}>Reg.Number :</span>
			{option?.registration_number || ''}
		</div>
		<div>
			<span className={styles.label}>Sage Id :</span>
			{option?.sage_organization_id || ''}
		</div>
	</div>
);

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
				labelKey="entity_code"
				initialCall
			/>
			{errors?.line_items?.[index]?.entityCode ? (
				<div className={styles.errors}>
					EntityCode is Required
				</div>
			) : null}
		</div>
	),
	controller: ({ control, index, setValue, entity, getGlCode, watch, errors }) => (
		<div className={`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}>
			<AsyncSelectController
				control={control}
				name={`line_items.${index}.accMode`}
				placeholder="Select Mode"
				initialCall
				asyncKey="jv_account_mode"
				rules={{ required: !isEmpty(watch(`line_items.${index}.tradePartyId`)) }}
				disabled={isEmpty(entity)}
				isClearable
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
			{errors?.line_items?.[index]?.accMode ? (
				<div className={styles.errors}>
					* Required
				</div>
			) : null}
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
					disabled={isEmpty(entity)}
					params={{
						accMode    : accMode || undefined,
						entityCode : entity || undefined,
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
				renderLabel={(option) => renderTradeParty(option)}
				isClearable
				initialCall
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
				rules={{ required: !isEmpty(watch(`line_items.${index}.accMode`)) }}
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
					rules={{
						validate: (val: number) => {
							if (val <= 0) {
								return 'Must greater than 0';
							}
							return null;
						},
					}}
					type="number"
				/>
				{errors?.line_items?.[index]?.amount ? (
					<div className={styles.errors}>
						{errors?.line_items?.[index]?.amount?.message}
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
