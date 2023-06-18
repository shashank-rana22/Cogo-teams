import { Checkbox } from '@cogoport/components';

interface Props {
	uncheckedRows?:string[],
	setUncheckedRows?:Function,
	row?:{ registrationNumber?:string },
}

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
}:Props) {
	const { registrationNumber	} = row || {};
	const handleChange = () => {
		if ((uncheckedRows || []).includes(registrationNumber)) {
			const filteredRows = (uncheckedRows || []).filter((rowId?:string) => rowId !== registrationNumber);
			setUncheckedRows([...filteredRows]);
		} else {
			setUncheckedRows((prev:string[]) => [...prev, registrationNumber]);
		}
	};

	return (
		<div>
			<Checkbox
				checked={!(uncheckedRows || []).includes(registrationNumber)}
				onChange={handleChange}
			/>
		</div>
	);
}

export default CheckboxItem;
