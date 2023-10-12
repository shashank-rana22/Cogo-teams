import { Tooltip } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';

import RemoveBpr from '../RemoveBpr/index';

import styles from './styles.module.css';

const START_POSITION_BUSINESS_NAME = 0;
const END_POSITION_BUSINESS_NAME = 40;

export const manageBprColumn = ({ refetch }) => [
	{
		Header   : 'Serial Id',
		accessor : (row) => (
			<div>
				{getByKey(row, 'tradePartyDetailSerialId')}
			</div>
		),
		id: 'serial_id',
	},
	{
		Header   : 'Sage Org Id',
		accessor : (row) => (
			<div>
				{getByKey(row, 'sageOrgId')}
			</div>
		),
		id: 'sageOrg_id',
	},
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => (

			(getByKey(row, 'businessName'))?.length > END_POSITION_BUSINESS_NAME ? (
				<Tooltip
					interactive
					placement="top"
					content={<div className={styles.tool_tip}>{getByKey(row, 'businessName')}</div>}
				>
					<text className={styles.cursor}>
						{`${(getByKey(row, 'businessName')).substring(
							START_POSITION_BUSINESS_NAME,
							END_POSITION_BUSINESS_NAME,
						)}...`}
					</text>
				</Tooltip>
			)
				: (
					<div>
						{getByKey(row, 'businessName')}
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
