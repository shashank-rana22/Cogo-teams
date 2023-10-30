import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import accountStatusMapping from '../../../../utils/accountStatusMapping';

import OptionPopoverContent from './OptionPopoverContent';

const PAGE_OFFSET = 1;
const INDEX_OFFSET = 1;

const getColumns = ({
	data = {},
}) => [
	{
		id       : 'serial_no',
		Header   : 'No.',
		accessor : (item, index) => (
			((data?.page || PAGE_OFFSET) - PAGE_OFFSET) * data.page_limit + index + INDEX_OFFSET),
	},
	{
		id       : 'business_name',
		Header   : 'Company Name',
		accessor : (item) => (item?.business_name || '--'),
	},

	{
		id       : 'name',
		Header   : 'Agent Name',
		accessor : (item) => (item?.agents?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '--'),
	},
	{
		id       : 'account_type',
		Header   : 'Type',
		accessor : (item) => (startCase(item?.account_type)),
	},
	{
		id       : 'kyc_status',
		Header   : 'Account Status',
		accessor : (item) => (accountStatusMapping(item)),
	},
	{
		id       : 'update_details',
		Header   : '',
		accessor : (item) => (
			<Popover
				placement="left"
				content={<OptionPopoverContent item={item} />}
			>
				<IcMOverflowDot style={{ cursor: 'pointer' }} />
			</Popover>
		),
	},
];
export default getColumns;
