import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import OptionPopoverContent from './OptionPopoverContent';

const PAGE_OFFSET = 1;
const INDEX_OFFSET = 1;

function PopoverItem(
	{
		item = {}, setShowDeleteModal = () => {}, setItemData = () => {},
		getSegmentData = () => {},
	},
) {
	const [visible, setVisible] = useState(false);
	return (
		<Popover
			placement="left"
			visible={visible}
			onClickOutside={() => { setVisible(false); }}
			content={(
				<OptionPopoverContent
					item={item}
					setShowDeleteModal={setShowDeleteModal}
					setVisible={setVisible}
					setItemData={setItemData}
					getSegmentData={getSegmentData}
				/>
			)}
		>
			<IcMOverflowDot style={{ cursor: 'pointer' }} onClick={() => setVisible((prev) => !prev)} />
		</Popover>
	);
}

const getColumns = (
	{
		page = 1, pageLimit = 10, setShowDeleteModal = () => {}, statusFilter = '',
		setItemData = () => {}, getSegmentData = () => {},
	},
) => {
	const dateTime = (item) => (
		item?.validity_start
			? (
				`${format(item?.validity_start, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])}
				- ${format(item?.validity_end, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])}`
			) : (
				`${item?.day_start_time || ''} - ${item?.day_end_time || ''}`
			));
	const withOutActions = [
		{
			id       : 'serial_no',
			Header   : 'No',
			accessor : (item, index) => ((page - PAGE_OFFSET) * pageLimit + index + INDEX_OFFSET),
		},
		{
			id       : 'id',
			Header   : 'Segment',
			accessor : (item) => (startCase(item?.segmentation_name)),
		},
		{
			id       : 'category',
			Header   : 'Categories',
			accessor : (item) => (startCase(item?.category?.replaceAll('_', ' '))),
		},
		{
			id       : 'channel_type',
			Header   : 'Channel',
			accessor : (item) => (startCase(item?.channel_type?.replaceAll('_', ' '))),
		},
		{
			id       : 'actions',
			Header   : 'Action',
			accessor : (item) => (startCase(item?.actions)),
		},
		{
			id       : 'duration_data',
			Header   : 'Duration',
			accessor : (item) => (
				<div>
					<div style={{ fontWeight: 700 }}>
						{startCase(item?.day || item?.sub_action)}
					</div>
					{item?.sub_action !== 'indefinite' && (<div>{dateTime(item)}</div>)}
				</div>
			),
		},
		{
			id       : 'created_at',
			Header   : 'Created At',
			accessor : (item) => (format(item?.created_at, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])),
		},
	];

	const withActions = [
		{
			id       : 'update_details',
			Header   : '',
			accessor : (item) => (
				<PopoverItem
					item={item}
					setShowDeleteModal={setShowDeleteModal}
					setItemData={setItemData}
					getSegmentData={getSegmentData}
				/>
			),
		},
	];
	if (statusFilter === 'active') {
		return [...withOutActions, ...withActions];
	}
	return withOutActions;
};
export default getColumns;
