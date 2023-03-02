import { Input, Select } from '@cogoport/components';

function GetLabelInputPair({ data }) {
	const { labelName, style, multiInput, multiSelectParams = {}, singleSelectParams = {}, setValue, value } = data;
	const { eventValue, placeholder, options, isClearable, inputStyle } = multiSelectParams;
	const { size, placeholder_singleSelect } = singleSelectParams;

	return (
		<div style={style}>
			<p style={{ color: '#4f4f4f' }}>{labelName}</p>
			{multiInput ? (
				<Select
					value={eventValue}
					onChange={(val) => {
						setValue((pv) => ({ ...pv, [value]: val }));
					}}
					placeholder={placeholder}
					options={options}
					isClearable={isClearable}
					style={inputStyle}
				/>
			) : (
				<Input
					size={size}
					placeholder={placeholder_singleSelect}
					onChange={(val) => {
						setValue((pv) => ({ ...pv, [value]: val }));
					}}
				/>
			)}
		</div>
	);
}
export default GetLabelInputPair;
