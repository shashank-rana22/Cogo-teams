import { Button, Popover, cl } from '@cogoport/components';
import { AsyncSelectController, InputController } from '@cogoport/forms';
import { IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { EMPTY_LINE_ITEMS } from '../../../../../Constants';
import TabController from '../ControlledTab';

import styles from './styles.module.css';

const ALLOWABLE_ENTITY_CODES = ['101', '401', '301'];
function RenderButtons({
	lineitemvalue = {},
	insert = () => {},
	index = 0,
}) {
	return (
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
}

const ACCOUNT_TYPE_MAPPINGS = {
	AP : 'service_provider',
	AR : 'importer_exporter',
};

function RenderTradeParty({
	option = {
		legal_business_name  : '',
		registration_number  : '',
		sage_organization_id : '',
	},
}) {
	return (
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
}
const handleModifiedOptions = ({ options:tradeData = [] }) => {
	const opt = (tradeData || []).map((item) => {
		if (item?.sage_organization_id !== null) {
			return item;
		}
		return [];
	}).flat();
	return opt;
};

const handleModeChange = ({
	index = 0,
	entityCode = '',
	accMode = '',
	setValue = () => {},
	getGlCode = () => {},
}) => {
	getGlCode({ index, entityCode, accMode, setValue });
};

const renderGlcode = (item) => `${item?.accountCode} - ${item?.description} - ${item?.ledAccount}`;

export const renderLineItemFunctions = {
	duplicate: ({ index, watch, insert }) => {
		const lineitemvalue = watch(`line_items.${index}`);
		return (
			<div className={styles.container}>
				<Popover
					placement="bottom"
					render={(
						<RenderButtons
							lineitemvalue={lineitemvalue}
							insert={insert}
							index={index}
						/>
					)}
				>
					<div className={styles.duplicate}>
						<IcMOverflowDot height={20} width={20} />
					</div>
				</Popover>
			</div>
		);
	},
	entity: ({ control, index, errors, entity, watch, setValue, getGlCode }) => {
		const { accMode = '' } = watch(`line_items.${index}`);
		const disabled = index === 0;

		return (
			<div
				className={cl`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}
			>
				<AsyncSelectController
					control={control}
					name={`line_items.${index}.entityCode`}
					finalValue={entity}
					disabled={isEmpty(entity) || disabled}
					asyncKey="list_cogo_entity"
					placeholder="Select Entity"
					onChange={(val) => {
						handleModeChange({
							index,
							entityCode: val,
							accMode,
							setValue,
							getGlCode,
						});
					}}
					labelKey="entity_code"
				/>
				{errors?.line_items?.[index]?.entityCode ? (
					<div className={styles.errors}>EntityCode is Required</div>
				) : null}
			</div>
		);
	},
	controller: ({
		control,
		index,
		setValue,
		entity,
		getGlCode,
		watch,
		errors,
	}) => {
		const { entityCode = '' } = watch(`line_items.${index}`);
		return (
			<div
				className={cl`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}
			>
				<AsyncSelectController
					control={control}
					name={`line_items.${index}.accMode`}
					placeholder="Select Mode"
					initialCall
					asyncKey="jv_account_mode"
					rules={{
						required: !isEmpty(
							watch(`line_items.${index}.tradePartyId`),
						),
					}}
					disabled={isEmpty(entity)}
					isClearable
					onChange={(val) => {
						handleModeChange({
							index,
							entityCode : isEmpty(entityCode) ? entity : entityCode,
							accMode    : val,
							setValue,
							getGlCode,
						});
					}}
				/>
				{errors?.line_items?.[index]?.accMode ? (
					<div className={styles.errors}>* Required</div>
				) : null}
			</div>
		);
	},
	gl_code: ({ control, index, errors, watch, entity }) => {
		const { accMode = '', entityCode = '' } = watch(`line_items.${index}`);
		return (
			<div
				className={cl`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}
			>
				<AsyncSelectController
					control={control}
					name={`line_items.${index}.glCode`}
					placeholder="Select Code"
					renderLabel={(option) => renderGlcode(option)}
					asyncKey="jv_code_master"
					disabled={isEmpty(entity)}
					params={{
						accMode    : accMode || undefined,
						entityCode : (isEmpty(entityCode) ? entity : entityCode) || undefined,
					}}
					rules={{ required: true }}
				/>
				{errors?.line_items?.[index]?.glCode ? (
					<div className={styles.errors}>* Required</div>
				) : null}
			</div>
		);
	},
	business_partner: ({ control, index, errors, setValue, watch, entity }) => {
		const entityValue = watch(`line_items.${index}.entityCode`) || entity;
		const modifiedOptions = ALLOWABLE_ENTITY_CODES.includes(entityValue) ? {
			getModifiedOptions: handleModifiedOptions,
		} : {};

		return (

			<div
				className={cl`${styles.selectcontainer} ${styles.paddingleft} ${styles.menuwidth}`}
			>
				<AsyncSelectController
					control={control}
					name={`line_items.${index}.tradePartyId`}
					placeholder="Select Partner"
					asyncKey="list_trade_parties"
					renderLabel={(option) => <RenderTradeParty option={option} />}
					isClearable
					initialCall
					params={{
						sage_organization_id_required : true,
						filters                       : {
							status: 'active',
							account_type:
							ACCOUNT_TYPE_MAPPINGS[
								watch(`line_items.${index}.accMode`)
							] || undefined,
						},
					}}
					{...modifiedOptions}
					onChange={(val, obj) => {
						setValue(
							`line_items.${index}.sageOrgId`,
							obj?.sage_organization_id,
						);
					}}
					rules={{
						required: !isEmpty(watch(`line_items.${index}.accMode`)),
					}}
				/>
				<div className={styles.sageid}>
					{watch(`line_items.${index}.sageOrgId`) || ''}
				</div>
				{errors?.line_items?.[index]?.tradePartyId ? (
					<div className={styles.errors}>* Required</div>
				) : null}
			</div>
		);
	},

	type: ({ control, index, errors }) => (
		<div className={cl`${styles.inputcontainer} ${styles.paddingleft}`}>
			<TabController
				name={`line_items.${index}.type`}
				control={control}
			/>
			{errors?.line_items?.[index]?.type ? (
				<div className={styles.errors}>* Required</div>
			) : null}
		</div>
	),

	amount: ({ control, index, errors, watch }) => {
		const type = watch(`line_items.${index}.type`);
		const classname = type === 'DEBIT' ? styles.debit : styles.credit;
		return (
			<div
				className={cl`${styles.inputcontainer} ${styles.paddingleft} ${classname}`}
			>
				<InputController
					name={`line_items.${index}.amount`}
					control={control}
					placeholder="Amount"
					rules={{
						validate: (val) => {
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
