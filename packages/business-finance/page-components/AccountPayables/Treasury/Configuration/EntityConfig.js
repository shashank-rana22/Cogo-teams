import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey, isEmpty } from '@cogoport/utils';
import React from 'react';

import AddButton from '../ConfigFunctions/AddButton';
import IconPopover from '../ConfigFunctions/IconPopover';
import PendingRequest from '../ConfigFunctions/PendingRequest';

import styles from './styles.module.css';

const BANKNAME_LENGTH = 30;
const MAX_BANK_NAME_LENGTH = 20;
const MAX_BANK_ACCOUNT = 25;
const MIN_LENGTH = 0;

const EntityConfig = ({ refetch }) => [

	{
		Header   : 'Bank Account',
		span     : 1,
		id       : 'checkbox',
		accessor : (row) => (

			<div>
				{row?.bankname?.length > BANKNAME_LENGTH ? (
					<Tooltip
						theme="light"
						interactive
						content={(
							<div className={styles.container}>
								<div className={styles.text}>
									<div className={styles.label}>Bank Name :</div>
									<div className={styles.value}>{row?.bankname}</div>
								</div>
								<div className={styles.text}>
									<div className={styles.label}>Acc. No :</div>
									<div className={styles.value}>{row?.bankAccountNo}</div>
								</div>
							</div>
						)}
						placement="top"
					>
						<div className={styles.container}>
							<div className={styles.value}>
								{`${row?.bankname?.substring(MIN_LENGTH, MAX_BANK_NAME_LENGTH)}...`}
							</div>
							<div className={styles.text}>
								{`${row?.bankAccountNo?.substring(MIN_LENGTH, MAX_BANK_ACCOUNT)}...`}
							</div>
						</div>
					</Tooltip>
				) : (
					<div className={styles.container}>
						<div className={styles.value}>{row?.bankname}</div>
						<div className={styles.text}>{row?.bankAccountNo}</div>
					</div>
				)}
			</div>
		),
	},
	{
		Header   : 'Currency',
		id       : 'currency',
		accessor : (row) => (
			<div>
				{getByKey(row, 'currency')}
			</div>
		),
	},
	{
		Header   : 'Allocated Fund',
		id       : 'allocatedFund',
		accessor : (row) => (
			<div className={styles.flex_column}>
				<div>
					{ formatAmount({
						amount   : getByKey(row, 'allocatedAmount'),
						currency : getByKey(row, 'currency'),
						options  : {
							currencyDisplay : 'code',
							style           : 'currency',
						},
					})}

				</div>

				<div>
					{!isEmpty(getByKey(row, 'fundAllotmentTimeline')) && (
						<div className={styles.container}>
							<div className={styles.details_text}>
								{formatDate({
									date:
									getByKey(row, 'fundAllotmentTimeline')[GLOBAL_CONSTANTS.zeroth_index].updatedAt,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
									formatType : 'dateTime',
								})}
							</div>
							<div className={styles.details_text}>
								Updated By :
								{getByKey(row, 'fundAllotmentTimeline')[GLOBAL_CONSTANTS.zeroth_index].allocatedBy}
							</div>
						</div>

					)}

				</div>
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => (
			<IconPopover itemData={row} />
		),
		id: 'remarks',

	},
	{
		Header   : 'Utilized Amount',
		id       : 'utilizedAmount',
		accessor : (row) => (
			<div>
				<div>
					{
					formatAmount({
						amount   : getByKey(row, 'utilizedAmount'),
						currency : getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})
					}
				</div>
			</div>
		),
	},

	{
		Header   : 'Balance',
		id       : 'balance',
		accessor : (row) => (
			<div>
				<div>
					{
					formatAmount({
						amount   : getByKey(row, 'balance'),
						currency : getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})
					}
				</div>
			</div>
		),
	},
	{
		Header   : '',
		accessor : (row) => (
			<PendingRequest itemData={row} />
		),
		id: 'count',
	},
	{
		Header   : '',
		accessor : (row) => (
			<AddButton itemData={row} refetch={refetch} />
		),
		id: 'Add',
	},

];

export default EntityConfig;
