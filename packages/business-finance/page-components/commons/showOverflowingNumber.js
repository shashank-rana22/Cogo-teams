import { Tooltip } from '@cogoport/components';

const showOverflowingNumber = (value: number | string, maxLength:number) => {
	const newValue = String(value) || '';

	if (String(newValue).length > maxLength) {
		return (
			<Tooltip content={newValue} interactive>
				<div>
					{(newValue as string).substring(0, maxLength)}
					...
				</div>
			</Tooltip>
		);
	}
	return <div>{newValue}</div>;
};

export default showOverflowingNumber;
