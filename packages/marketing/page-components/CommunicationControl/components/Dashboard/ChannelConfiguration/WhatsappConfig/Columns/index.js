import { Popover, Pill } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OptionPopoverContent from './OptionPopoverContent';

const PAGE_OFFSET = 1;
const INDEX_OFFSET = 1;

const columns = ({
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
		Header   : 'Key name',
		accessor : (item) => (item?.key),
	},
	{
		id       : 'number',
		Header   : 'Whatsapp number',
		accessor : (item) => (item?.whatsapp_number),
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
		accessor : (item) => (item?.assigned_users),
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
export default columns;
