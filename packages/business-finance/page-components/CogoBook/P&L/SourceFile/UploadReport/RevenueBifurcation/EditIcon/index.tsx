import { Input } from '@cogoport/components';

function EditIcon({ index, setValue, valueData, value }) {
	console.log({ value, valueData }, 'value');
	return (
		<div>
			<Input
				type="number"
				value={value[index] || valueData}
				onChange={(val) => {
					setValue((prev) => ({
						...prev,
						[index]: val,
					}));
				}}
				placeholder="Type"
			/>
		</div>
	);
}
export default EditIcon;
