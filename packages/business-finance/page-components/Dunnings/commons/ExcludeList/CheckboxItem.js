import { Checkbox } from '@cogoport/components';

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
	feature = 'exception-management',
}) {
	const { registrationNumber, tradePartyDetailId	} = row || {};

	let seedingValue;
	if (feature === 'campaign-management') {
		seedingValue = tradePartyDetailId;
	} else {
		seedingValue = registrationNumber;
	}

	const handleChange = () => {
		setUncheckedRows((prevUncheckedRows) => (prevUncheckedRows.includes(seedingValue)
			? prevUncheckedRows.filter((rowId) => rowId !== seedingValue)
			: [...prevUncheckedRows, seedingValue]));
	};
	return (
		<div>
			<Checkbox
				checked={!(uncheckedRows || []).includes(seedingValue)}
				onChange={handleChange}
			/>
		</div>
	);
}

export default CheckboxItem;
