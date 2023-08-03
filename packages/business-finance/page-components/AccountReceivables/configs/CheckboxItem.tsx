import { Checkbox } from '@cogoport/components';

function CheckboxItem({
	IRN_GENERATEABLE_STATUSES,
	checkedRows,
	setCheckedRows,
	row,
}) {
	const { id, invoiceStatus } = row || {};
	const handleChange = () => {
		if ((checkedRows || []).includes(id)) {
			const filteredRows = (checkedRows || []).filter((rowId?:string) => rowId !== id);
			setCheckedRows([...filteredRows]);
		} else {
			setCheckedRows((prev:string[]) => [...prev, id]);
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
