import { Checkbox } from '@cogoport/components';

interface Props {
	uncheckedRows?:string[],
	setUncheckedRows?:Function,
	row?:{ id?:string },
}

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
}:Props) {
	const { id } = row || {};
	const handleChange = () => {
		if ((uncheckedRows || []).includes(id)) {
			const filteredRows = (uncheckedRows || []).filter((rowId?:string) => rowId !== id);
			setUncheckedRows([...filteredRows]);
		} else {
			setUncheckedRows((prev:string[]) => [...prev, id]);
		}
	};

	return (
		<div>
			<Checkbox
				checked={!(uncheckedRows || []).includes(id)}
				onChange={handleChange}
			/>
		</div>
	);
}

export default CheckboxItem;
