import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMUndo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import SplitAthAmount from './SplitAthAmount';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const FIXED_UPTO = 2;

export const fieldColumns = ({
	isEdit = false,
	setIsEdit = () => {},
	isEditTime = false,
	setIsEditTime = () => {},
	setFinalGetHookData = () => {},
	singleServiceProvider = {},
}) => {
	const setAdvancedAmount = (item) => {
		const tempItem = item;
		tempItem.updated_advance_amount = tempItem?.advanced_amount;
		setIsEdit(!isEdit);
	};
	const setDetentionFreeTime = (item) => {
		const tempItem = item;
		tempItem.updated_detention_free_time = tempItem?.detention_free_time;
		setIsEditTime(!isEditTime);
	};

	const basLineItem =	singleServiceProvider?.line_items?.find(
		(lineItem) => lineItem?.code === 'BAS',
	) || {};

	return [{
		label  : 'Service Provider',
		render : (item) => (
			<div>
				<div>
					{item?.service_provider?.business_name || 'Service Provider'}
				</div>
				<div className={styles.priority}>
					Priority -
					{item.priority}
				</div>
			</div>
		),
		key  : 'service_provider',
		span : 2,
	},
	{
		label  : 'Rate Source',
		render : (item) => (
			<div>{startCase(item?.source || '-')}</div>
		),
		key  : 'rate_source',
		span : 1,
	},
	{
		label  : 'Updated At',
		render : (item) => (
			<div>
				{item?.updated_at ? formatDate({
					date       : item.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})
					: '-'}
			</div>
		),
		key  : 'updated_at',
		span : 1,
	},
	{
		label  : !isEmpty(basLineItem?.unit) ? startCase(basLineItem.unit) : '/ Truck',
		render : (item) => (
			<div>
				<div>
					{item.currency}
					{' '}
					{item?.price || '-'}
				</div>
				<div className={item.profit > DEFAULT_VALUE ? styles.green : styles.red}>
					Profit -
					{' '}
					{Number(item.profit_percentage).toFixed(FIXED_UPTO)}
					{' '}
					%
				</div>
			</div>
		),
		key  : 'per_unit_price',
		span : 1,
	},
	{
		label  : 'Quantity',
		render : () => (
			<div>
				{!isEmpty(basLineItem?.quantity)
					? startCase(basLineItem?.quantity)
					: '1'}
			</div>
		),
		span : 1,
		key  : 'quantity',
	},
	{
		label  : 'Detention Free Time',
		render : (item) => (!isEditTime ? (
			<div>
				{item?.detention_free_time
					? `${item?.detention_free_time} hrs`
					: '-'}
				{' '}
			</div>
		) : (
			<Input
				type="text"
				value={item?.updated_detention_free_time || DEFAULT_VALUE}
				onChange={(e) => {
					const tempItem = item;
					tempItem.updated_detention_free_time = +e;
					setFinalGetHookData((prev) => ({ ...prev }));
				}}
			/>
		)),

		key  : 'detention_free_time',
		span : 1.5,
	},
	{
		label  : 'Edit Detention',
		render : (item) => (
			<div className={styles.edit}>
				<IcMEdit
					style={{ marginBottom: 5, cursor: 'pointer' }}
					onClick={() => setIsEditTime(!isEditTime)}
				/>
				<IcMUndo
					style={{ cursor: 'pointer' }}
					onClick={() => setDetentionFreeTime(item)}
				/>
			</div>
		),
		key  : 'edit_detention',
		span : 1,
	},
	{
		label  : 'Validity Till',
		render : (item) => (
			<div>
				{item?.validity_end
					? formatDate({
						date       : item.validity_end,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})
					: '-'}
			</div>
		),
		key  : 'validity_till',
		span : 1,
	},
	{
		label  : 'Transit Time',
		render : (item) => (item?.transit_time ? (
			<div>
				{item?.transit_time}
				{' '}
				hrs
			</div>
		) : (
			<div>-</div>
		)),
		key  : 'transit_time',
		span : 1,
	},
	{
		label  : 'ATH Amount',
		render : (item) => (!isEdit ? (
			<div>
				{item?.advance_amount_currency}
				{' '}
				{item?.advance_amount || DEFAULT_VALUE}
			</div>
		) : (
			<Input
				type="text"
				value={item?.updated_advance_amount || item?.advance_amount || DEFAULT_VALUE}
				onChange={(e) => {
					const tempItem = item;
					tempItem.updated_advance_amount = +e;
					setFinalGetHookData((prev) => ({ ...prev }));
				}}
			/>
		)),
		key  : 'ath_amount',
		span : 1,
	},
	{
		label  : 'Edit ATH Value',
		render : (item) => (
			<div className={styles.edit}>
				<IcMEdit
					style={{ marginBottom: 5, cursor: 'pointer' }}
					onClick={() => setIsEdit(!isEdit)}
				/>
				<IcMUndo
					style={{ cursor: 'pointer' }}
					onClick={() => setAdvancedAmount(item)}
				/>
			</div>
		),
		key  : 'edit_ath',
		span : 1,
	},
	{
		label  : ' ',
		render : (item) => (
			<SplitAthAmount item={item} setFinalGetHookData={setFinalGetHookData} />
		),
		key  : 'split_ath',
		span : 1,
	}];
};
