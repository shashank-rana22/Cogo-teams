import { Radio, Textarea } from '@cogoport/components';

function DefaultOptions({
	cancellationReason,
	setCancellationReason,
	cancellationSubReason,
	setCancellationSubReason,
}) {
	const handleOnChange = (val) => {
		if (cancellationReason === val) {
			setCancellationReason(null);
		} else {
			setCancellationReason(val);
		}
	};
	return (
		<>
			<Radio
				label="Profitability Issue"
				value="profitability_issue"
				onChange={() => handleOnChange('profitability_issue')}
				checked={cancellationReason === 'profitability_issue'}
			/>
			<Radio
				label="Space/Inventory not available"
				value="space_unavailable"
				onChange={() => handleOnChange('space_unavailable')}
				checked={cancellationReason === 'space_unavailable'}
			/>
			<Radio
				label="Preferred Line not available"
				value="preferred_line_not_avilable"
				onChange={() => handleOnChange('preferred_line_not_avilable')}
				checked={cancellationReason === 'preferred_line_not_avilable'}
			/>
			<Radio
				label="Rates not available"
				value="rates_not_available"
				onChange={() => handleOnChange('rates_not_available')}
				checked={cancellationReason === 'rates_not_available'}
			/>
			<div style={{ padding: '0 10px' }}>
				<Textarea
					name="a4"
					size="sm"
					placeholder="Other Reason"
					value={cancellationSubReason}
					onChange={(val) => setCancellationSubReason(val)}
				/>
			</div>

		</>
	);
}
export default DefaultOptions;
