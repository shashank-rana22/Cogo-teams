import { Tooltip } from '@cogoport/components';

const showOverflowingNumber = (value, maxLength) => {
	const newValue = String(value) || '';

	if (String(newValue).length > maxLength) {
		return (
			<Tooltip content={newValue} interactive>
				<div>
					{(newValue).substring(0, maxLength)}
					...
				</div>
			</Tooltip>
		);
	}
	return <div>{newValue}</div>;
};

export default showOverflowingNumber;
