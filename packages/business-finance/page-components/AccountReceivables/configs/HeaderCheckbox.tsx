import { Checkbox } from '@cogoport/components';

interface Props {
	totalRows?:object[],
	isHeaderChecked?:boolean,
	setIsHeaderChecked?:Function,
	IRN_GENERATEABLE_STATUSES?:string[],
	setCheckedRows?:Function,
}

function HeaderCheckbox({
	isHeaderChecked,
	setIsHeaderChecked,
	totalRows,
	IRN_GENERATEABLE_STATUSES,
	setCheckedRows,
}:Props) {
	const handleChange = (e) => {
		if (e?.target?.checked) {
			setIsHeaderChecked(true);
			const totalIds = totalRows?.map((row:{ id?:string | number, invoiceStatus?:string }) => {
				if (IRN_GENERATEABLE_STATUSES.includes(row?.invoiceStatus)) { return row?.id; }
				return null;
			});
			const filteredIds = totalIds?.filter((id) => id !== null);
			setCheckedRows([...filteredIds]);
		} else {
			setIsHeaderChecked(false);
			setCheckedRows([]);
		}
	};

	return (
		<div>
			<Checkbox
				checked={isHeaderChecked}
				onChange={handleChange}
			/>
		</div>
	);
}

export default HeaderCheckbox;
