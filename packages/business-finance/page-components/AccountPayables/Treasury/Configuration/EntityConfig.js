import { Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import AddButton from '../ConfigFunctions/AddButton';
import IconPopover from '../ConfigFunctions/IconPopover';

import styles from './styles.module.css';

const geo = getGeoConstants();

const EntityConfig = ({ refetch }) => [

	{
		Header   : 'Bank Account',
		span     : 1,
		id       : 'checkbox',
		accessor : (row) => (

			<div>
				{row?.bankname?.length > 30 ? (
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
							<div className={styles.value}>{`${row?.bankname.substring(0, 20)}...`}</div>
							<div className={styles.text}>{`${row?.bankAccountNo.substring(0, 25)}...`}</div>
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
					{getByKey(row, 'fundAllotmentTimeline')?.length && (
						<div className={styles.container}>
							<div className={styles.details_text}>
								{formatDate({
									date       : getByKey(row, 'fundAllotmentTimeline')[0].updatedAt,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
									formatType : 'dateTime',
								})}
							</div>
							<div className={styles.details_text}>
								Updated By :
								{getByKey(row, 'fundAllotmentTimeline')[0].allocatedBy}
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
			<AddButton itemData={row} refetch={refetch} />
		),
		id: 'Add',
	},

];

export default EntityConfig;
