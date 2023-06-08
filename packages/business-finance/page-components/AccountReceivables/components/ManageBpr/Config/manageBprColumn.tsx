import { Tooltip } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';

import RemoveBpr from '../RemoveBpr';

import styles from './styles.module.css';

const MIN_NAME_STRING = 0;
const MAX_NAME_STRING = 40;

interface ManageBpr {
	refetch : Function
}

export const manageBprColumn = ({ refetch } : ManageBpr) => [
	{
		Header   : 'Serail Id',
		accessor : (row) => (
			<div>
				{getByKey(row, 'tradePartyDetailSerialId') as number}
			</div>
		),
		id: 'serial_id',
	},
	{
		Header   : 'Sage Org Id',
		accessor : (row) => (
			<div>
				{getByKey(row, 'sageOrgId') as number}
			</div>
		),
		id: 'sageOrg_id',
	},
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => (

			(getByKey(row, 'businessName') as string)?.length > MAX_NAME_STRING ? (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tool_tip}>{getByKey(row, 'businessName') as string}</div>}
				>
					<text className={styles.cursor}>
						{`${(getByKey(row, 'businessName') as string).substring(
							MIN_NAME_STRING,
							MAX_NAME_STRING,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div>
						{getByKey(row, 'businessName') as string}
					</div>
				)
		),
	},
	{
		Header   : 'Action',
		id       : 'action',
		accessor : (row) => (
			<RemoveBpr refetch={refetch} row={row} />
		),
	},

];
