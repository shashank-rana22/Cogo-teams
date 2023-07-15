import { Tooltip, Toggle, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDelete } from '@cogoport/icons-react';

import GetSortingData from '../components/ExceptionsManagement/sorting.tsx';

import styles from './styles.module.css';

const masterExceptionColumn = ({
	sort,
	setSort,
	deleteMasterException,
	deleteMasterLoading,
	exceptionFilter,
	setExceptionFilter,
	setShowConfirmationModal,
	setMasterListId,
}) => (
	[
		{
			Header   : 'Customer Name',
			id       : 'name',
			accessor : (row) => (
				<div>
					<Tooltip
						content={(
							<div className={styles.tooltip_text}>
								{row?.name}
							</div>
						)}
						interactive
					>
						<div className={styles.customer_name}>
							{row?.name || ''}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			Header   : 'PAN',
			id       : 'registrationNumber',
			accessor : (row) => (
				<div className={styles.text}>
					{row?.registrationNumber || '-'}
				</div>
			),
		},
		{
			Header   : 'Category',
			id       : 'orgSegment',
			accessor : (row) => (
				<div className={styles.text}>
					{row?.orgSegment || '-'}
				</div>
			),
		},
		{
			Header: (
				<div style={{ display: 'flex' }}>
					<span style={{ marginRight: '8px' }}>Credit Days</span>
					<GetSortingData
						setSort={setSort}
						type="creditDays"
						exceptionFilter={exceptionFilter}
						setExceptionFilter={setExceptionFilter}
						sort={sort}
					/>
				</div>
			),
			id       : 'creditDays',
			accessor : (row) => (
				<div className={styles.text}>
					{row?.creditDays || GLOBAL_CONSTANTS.zeroth_index}
				</div>
			),
		},
		{
			Header: (
				<div style={{ display: 'flex' }}>
					<span style={{ marginRight: '8px' }}>Credit Amount</span>
					<GetSortingData
						setSort={setSort}
						type="creditAmount"
						exceptionFilter={exceptionFilter}
						setExceptionFilter={setExceptionFilter}
						sort={sort}
					/>
				</div>
			),
			id       : 'creditAmount',
			accessor : (row) => (
				<div className={styles.text}>
					{formatAmount({
						amount   : row?.creditAmount || GLOBAL_CONSTANTS.zeroth_index,
						currency : row?.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							minimumFractionDigits : 2,
						},
					})}
				</div>
			),
		},
		{
			Header: (
				<div style={{ display: 'flex' }}>
					<span style={{ marginRight: '8px' }}>Total Due</span>
					<GetSortingData
						type="dueAmount"
						setSort={setSort}
						exceptionFilter={exceptionFilter}
						setExceptionFilter={setExceptionFilter}
						sort={sort}
					/>
				</div>
			),
			id       : 'totalDueAmount',
			accessor : (row) => (
				<div className={styles.text}>
					{formatAmount({
						amount   : row?.totalDueAmount || GLOBAL_CONSTANTS.zeroth_index,
						currency : row?.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							minimumFractionDigits : 2,
						},
					})}
				</div>
			),
		},
		{
			Header   : 'Entity Code',
			id       : 'entityCode',
			accessor : (row) => (
				<div className={styles.text}>
					{row?.entityCode || '-'}
				</div>
			),
		},
		{
			Header   : '',
			id       : 'toggle',
			accessor : (row) => (
				<div>
					<Toggle
						disabled={deleteMasterLoading}
						name="isActive"
						size="md"
						showOnOff
						checked={row?.isActive}
						onChange={() => {
							deleteMasterException(row?.id, 'UPDATE');
						}}
					/>
				</div>
			),
		},
		{
			Header   : '',
			id       : 'delete',
			accessor : (row) => (
				<Button themeType="tertiary" disabled={deleteMasterLoading}>
					<IcMDelete
						onClick={() => {
							setMasterListId(row?.id);
							setShowConfirmationModal(true);
						}}
						width={24}
						height={24}
						color="#2C3E50"
					/>
				</Button>
			),
		},
	]
);
export default masterExceptionColumn;
