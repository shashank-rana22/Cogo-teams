import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import ShowOverflowingNumber from '../utils/getShowOverFlowingNumbers';

import styles from './styles.module.css';

const DOC_LENGTH = 6;
const CONCAT_LENGTH = 3;

const getServiceColumns = () => {
	const columns = [
		{
			id     : 'documentValue1',
			Header : (
				<div>Name</div>
			),
			accessor: (row) => (
				<div>
					<Tooltip
						content={(
							<div>
								{row?.document1 || ''}
							</div>
						)}
						interactive
					>
						<div>
							{(row?.document1 && row?.document1?.length > DOC_LENGTH
								? `${row?.document1?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.document1) || '-'}
						</div>
						{/* <Pill
								size="sm"
								color="#CFEAED"
								className={styles.docTypePill}
							>
								{row?.documentType || ''}
							</Pill> */}
					</Tooltip>
				</div>
			),
		},
		{
			id     : 'documentValue2',
			Header : (
				<div className={styles.quantity}>Qty.</div>
			),
			accessor: (row) => (
				<div className={styles.quantity}>
					{row?.document2}
				</div>
			),
		},
		{
			id     : 'documentValue3',
			Header : (
				<div>Unit</div>
			),
			accessor: (row) => (
				<div>
					<Tooltip
						content={(
							<div>
								{row?.document3 || ''}
							</div>
						)}
						interactive
					>
						<div>
							{(row?.document3 && row?.document3?.length > DOC_LENGTH
								? `${row?.document3?.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: row?.document3) || '-'}
						</div>
					</Tooltip>
				</div>
			),
		},
		{
			id     : 'documentValue4',
			Header : (
				<div>Price</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.document4, CONCAT_LENGTH, 'INR') }
				</div>
			),
		},
		{
			id     : 'documentValue5',
			Header : (
				<div>Margin</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.document5, CONCAT_LENGTH, 'INR') }
				</div>
			),
		},
		{
			id     : 'documentValue6',
			Header : (
				<div>Ex. Rate</div>
			),
			accessor: (row) => (
				<div>
					{row?.document6}
				</div>
			),
		},
		{
			id     : 'documentValue7',
			Header : (
				<div>Tax</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.document7, CONCAT_LENGTH, 'INR') }
				</div>
			),
		},
		{
			id     : 'documentValue8',
			Header : (
				<div>Cost</div>
			),
			accessor: (row) => (
				<div>
					{ShowOverflowingNumber(row?.document8, CONCAT_LENGTH, 'INR') }
				</div>
			),
		},

	];

	return columns;
};
export default getServiceColumns;
