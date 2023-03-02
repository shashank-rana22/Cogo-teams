import { Input, Select } from '@cogoport/components';


function GetLabelInputPair({ labelName, style, multiInput, multiSelectParams = {}, singleSelectParams = {}, setValue }) {
	const { eventValue, placeholder, options, isClearable, inputStyle } = multiSelectParams;
	const { size, placeholder_singleSelect } = singleSelectParams;

	return (
		<div style={style}>
			<p style={{ color: '#4f4f4f' }}>{labelName}</p>
			{multiInput ? (
				<Select
					value={eventValue}
					onChange={setValue}
					placeholder={placeholder}
					options={options}
					isClearable={isClearable}
					style={inputStyle}
				/>
			) : (
				<Input size={size} placeholder={placeholder_singleSelect} onChange={(val) => setValue(val)} />
			)}
		</div>
	);
}
export default GetLabelInputPair;
