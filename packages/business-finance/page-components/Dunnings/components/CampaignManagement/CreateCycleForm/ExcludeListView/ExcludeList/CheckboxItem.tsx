import { Checkbox } from '@cogoport/components';

interface Props {
	uncheckedRows?:string[],
	setUncheckedRows?:Function,
	row?:{ tradePartyDetailId?:string },
}

function CheckboxItem({
	uncheckedRows,
	setUncheckedRows,
	row,
}:Props) {
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
