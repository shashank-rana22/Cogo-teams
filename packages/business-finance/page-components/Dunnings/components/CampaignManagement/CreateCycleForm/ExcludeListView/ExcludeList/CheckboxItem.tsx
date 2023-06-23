import { Checkbox } from '@cogoport/components';

interface Props {
	uncheckedRows?: string[];
	setUncheckedRows?: Function;
	row?: { tradePartyDetailId?: string };
}

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
}:Props) {
	const { tradePartyDetailId } = row || {};
	const handleChange = () => {
		setUncheckedRows((prevUncheckedRows) => (prevUncheckedRows.includes(tradePartyDetailId)
			? prevUncheckedRows.filter((rowId) => rowId !== tradePartyDetailId)
			: [...prevUncheckedRows, tradePartyDetailId]));
	};
	return (
		<div>
			<Checkbox
				checked={!(uncheckedRows || []).includes(tradePartyDetailId)}
				onChange={handleChange}
			/>
		</div>
	);
}

export default CheckboxItem;
