import { Input, MultiSelect } from '@cogoport/components';

function GetLabelInputPair({ labelName, style, multiInput, multiSelectParams = {}, singleSelectParams = {} }) {
	const { value, onChange, placeholder, options, isClearable, inputStyle } = multiSelectParams;
	const { size, placeholder_singleSelect } = singleSelectParams;

	return (
		<div style={style}>
			{/* <div className={styles.input_label}>{labelName}</div> */}
			<p style={{ color: '#4f4f4f' }}>{labelName}</p>
			{multiInput ? (
				<MultiSelect
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					options={options}
					isClearable={isClearable}
					style={inputStyle}
				/>
			) : (
				<Input size={size} placeholder={placeholder_singleSelect} />
			)}
		</div>
	);
}
export default GetLabelInputPair;
