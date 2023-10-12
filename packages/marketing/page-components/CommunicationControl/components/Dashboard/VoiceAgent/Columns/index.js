import { Checkbox, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import OptionPopoverContent from './OptionPopoverContent';

function PopoverItem({
	item = {},
	listServetalAgent = () => {},
}) {
	const [visiblePopover, setVisiblePopover] = useState(false);
	return (
		<Popover
			placement="left"
			content={(
				<OptionPopoverContent
					item={item}
					setVisiblePopover={setVisiblePopover}
					listServetalAgent={listServetalAgent}
				/>
			)}
			visible={visiblePopover}
			onClickOutside={() => setVisiblePopover(false)}
		>
			<IcMOverflowDot
				style={{ cursor: 'pointer' }}
				onClick={() => { setVisiblePopover((prev) => !prev); }}
			/>
		</Popover>
	);
}

const getColumns = ({
	checkedRowsSerialId = [],
	setCheckedRowsSerialId = () => {},
	listServetalAgent = () => {},
}) => {
	const handleBodyCheckBoxChange = (val) => {
		if (checkedRowsSerialId.some((e) => e?.id === val?.id)) {
			setCheckedRowsSerialId((prevCheckedRows) => prevCheckedRows.filter((itm) => itm?.id !== val?.id));
		} else {
			setCheckedRowsSerialId((prevCheckedRows) => [...prevCheckedRows, val]);
		}
	};

	return (
		[
			{
				id       : 'checkbox',
				Header   : '',
				accessor : (item) => (
					<Checkbox
						size="sm"
						checked={
                            !isEmpty((checkedRowsSerialId || []).filter((e) => e?.id === item?.id))
                        }
						onChange={() => handleBodyCheckBoxChange(item)}
					/>
				),
			},
			{
				id       : 'name',
				Header   : 'Agent Name',
				accessor : (item) => (item?.agent_data?.name || 'NA'),
			},
			{
				id       : 'email',
				Header   : 'Agent Email ID',
				accessor : (item) => (item?.agent_data?.email || 'NA'),
			},
			{
				id       : 'mobile_number',
				Header   : 'Mobile Number',
				accessor : (item) => (item?.mobile_number || 'NA'),
			},
			{
				id       : 'created_at',
				Header   : 'Created On',
				accessor : (item) => (format(item?.created_at, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])),
			},
			{
				id       : 'servetel_status',
				Header   : 'Status',
				accessor : (item) => (startCase(item?.servetel_status) || '-'),
			},
			{
				id       : 'update_details',
				Header   : '',
				accessor : (item) => (
					<PopoverItem item={item} listServetalAgent={listServetalAgent} />
				),
			},
		]
	);
};
export default getColumns;
