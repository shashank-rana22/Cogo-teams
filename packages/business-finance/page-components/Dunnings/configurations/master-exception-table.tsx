import { Tooltip, Toggle, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDelete } from '@cogoport/icons-react';

import GetSortingData from '../components/ExceptionsManagement/sorting';

import styles from './styles.module.css';

interface Sort {
	sortType?: string;
	sortBy?: string;
}
interface MasterExceptionColumnInterface {
	sort?: Sort;
	setSort?: React.Dispatch<React.SetStateAction<object>>;
	deleteMasterLoading?: boolean;
	deleteMasterException?: Function;
	exceptionFilter?: object;
	setExceptionFilter?: React.Dispatch<React.SetStateAction<object>>;
	setShowConfirmationModal?: React.Dispatch<React.SetStateAction<boolean>>;
	setMasterListId?: React.Dispatch<React.SetStateAction<string>>;
}
const masterExceptionColumn = ({
	sort,
	setSort,
	deleteMasterException,
	deleteMasterLoading,
	exceptionFilter,
	setExceptionFilter,
	setShowConfirmationModal,
	setMasterListId,
}:MasterExceptionColumnInterface) => (
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
					{row?.creditDays || 0}
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
						amount   : row?.creditAmount || 0,
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
						amount   : row?.totalDueAmount || 0,
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
