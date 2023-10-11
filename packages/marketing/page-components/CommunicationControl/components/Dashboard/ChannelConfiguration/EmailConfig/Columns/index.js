import { Popover, Pill } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import getEmailType from '../../../../../utils/getEmailType';

const OptionPopoverContent = dynamic(() => import('./OptionPopoverContent'), { ssr: false, defer: true });

const PAGE_OFFSET = 1;
const INDEX_OFFSET = 1;

const getColumns = ({
	page = 1,
	pageLimit = 10,
	getChannelConfig = () => {},
}) => [
	{
		id       : 'serial_no',
		Header   : 'Serial No',
		accessor : (_, index) => ((page - PAGE_OFFSET) * pageLimit + index + INDEX_OFFSET),
	},
	{
		id       : 'key',
		Header   : 'Email',
		accessor : (item) => (item?.email || '--'),
		width    : 10,
	},
	{
		id       : 'type',
		Header   : 'Email Type',
		accessor : (item) => (getEmailType(item)?.map((val) => val).join(', ') || '--'),
	},
	{
		id       : 'status',
		Header   : 'Status',
		accessor : (item) => (
			<Pill color={`${item.status === 'active' ? 'green' : 'red'}`}>{startCase(item?.status)}</Pill>
		),
	},
	{
		id       : 'count',
		Header   : 'Assigned users',
		accessor : (item) => (item?.assigned_users || '--'),
	},
	{
		id       : 'update_details',
		Header   : '',
		accessor : (item) => (
			<Popover
				placement="left"
				content={(
					<OptionPopoverContent
						item={item}
						getChannelConfig={getChannelConfig}
					/>
				)}
			>
				<IcMOverflowDot style={{ cursor: 'pointer' }} />
			</Popover>
		),
	},
];
export default getColumns;
