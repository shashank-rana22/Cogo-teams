import { Input } from '@cogoport/components';

function EditIcon({ index, setValue, valueData, value }) {
	return (
		<div>
			<Input
				value={value[index]?.length >= 0 ? value[index] : valueData.split(' ')[0]}
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
