import { Checkbox } from '@cogoport/components';

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
}) {
	const { tradePartyDetailId } = row || {};
	const handleChange = () => {
		if ((uncheckedRows || []).includes(tradePartyDetailId)) {
			const filteredRows = (uncheckedRows || []).filter((rowId?:string) => rowId !== tradePartyDetailId);
			setUncheckedRows([...filteredRows]);
		} else {
			setUncheckedRows((prev:string[]) => [...prev, tradePartyDetailId]);
		}
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
