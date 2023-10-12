import { Checkbox } from '@cogoport/components';

function CheckboxItem({
	setIsHeaderChecked,
	IRN_GENERATEABLE_STATUSES,
	checkedRows,
	setCheckedRows,
	row,
	totalRows,
}) {
	const { id, invoiceStatus } = row || {};
	const handleChange = () => {
		if ((checkedRows || []).includes(id)) {
			const filteredRows = (checkedRows || []).filter((rowId?:string) => rowId !== id);
			setCheckedRows([...filteredRows]);
			setIsHeaderChecked(false);
		} else {
			setCheckedRows((prev:string[]) => [...prev, id]);

			const totalIds = totalRows?.map((temp:{ id?:string | number, invoiceStatus?:string }) => {
				if (IRN_GENERATEABLE_STATUSES.includes(temp?.invoiceStatus)) { return temp?.id; }
				return null;
			});

			const filteredIds = totalIds?.filter((id_) => id_ !== null);

			if (checkedRows.length + 1 === filteredIds.length) {
				setIsHeaderChecked(true);
			}
		}
	};

	return (
		<div>
			{IRN_GENERATEABLE_STATUSES.includes(invoiceStatus)
				? (
					<Checkbox
						checked={(checkedRows || []).includes(id)}
						onChange={handleChange}
					/>
				) : null}
		</div>
	);
}

export default CheckboxItem;
