import { Tooltip } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';

import { Refetch } from '../../../commons/Interfaces';
import RemoveBpr from '../RemoveBpr';

import styles from './styles.module.css';

const START_POSITION_BUSINESS_NAME = 0;
const END_POSITION_BUSINESS_NAME = 40;

interface RefetchInterface {
	refetch: Refetch
}

export const manageBprColumn = ({ refetch } : RefetchInterface) => [
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

			(getByKey(row, 'businessName') as string)?.length > END_POSITION_BUSINESS_NAME ? (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tool_tip}>{getByKey(row, 'businessName') as string}</div>}
				>
					<text className={styles.cursor}>
						{`${(getByKey(row, 'businessName') as string).substring(
							START_POSITION_BUSINESS_NAME,
							END_POSITION_BUSINESS_NAME,
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
