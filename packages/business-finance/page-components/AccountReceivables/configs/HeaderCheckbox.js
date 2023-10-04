import { Checkbox } from '@cogoport/components';

function HeaderCheckbox({
	isHeaderChecked,
	setIsHeaderChecked,
	totalRows,
	IRN_GENERATEABLE_STATUSES,
	setCheckedRows,
}) {
	const handleChange = (e) => {
		if (e?.target?.checked) {
			setIsHeaderChecked(true);
			const totalIds = totalRows?.map((row) => {
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
