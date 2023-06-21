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
		setUncheckedRows((prevUncheckedRows) => (prevUncheckedRows.includes(registrationNumber)
			? prevUncheckedRows.filter((rowId) => rowId !== registrationNumber)
			: [...prevUncheckedRows, registrationNumber]));
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
