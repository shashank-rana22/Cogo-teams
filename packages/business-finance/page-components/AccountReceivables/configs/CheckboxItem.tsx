import { Checkbox } from '@cogoport/components';

function CheckboxItem({
	IRN_GENERATEABLE_STATUSES,
	checkedRows,
	setCheckedRows,
	row,
}) {
	const { id, invoiceStatus } = row || {};
	return (
		<div>
			<Checkbox
				disabled={!IRN_GENERATEABLE_STATUSES.includes(invoiceStatus)}
				checked={(checkedRows || []).includes(id)}
				onChange={() => {
					if ((checkedRows || []).includes(id)) {
						const index = (checkedRows || []).indexOf(id);
						if (index > -1) { // only splice array when item is found
							checkedRows.splice(index, 1);
							setCheckedRows([...checkedRows]);
						}
					} else {
						setCheckedRows((prev:string[]) => [...prev,
							id]);
					}
				}}
			/>
		</div>
	);
}

export default CheckboxItem;
