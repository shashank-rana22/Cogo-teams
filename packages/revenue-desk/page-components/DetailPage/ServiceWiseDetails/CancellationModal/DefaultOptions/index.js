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
				label="Feasible rates not available"
				value="feasible_rates_not_available"
				onChange={() => handleOnChange('feasible_rates_not_available')}
				checked={cancellationReason === 'feasible_rates_not_available'}
			/>
			<Radio
				label="Wrong SID created"
				value="wrong_sid_created"
				onChange={() => handleOnChange('wrong_sid_created')}
				checked={cancellationReason === 'wrong_sid_created'}
			/>
			<Radio
				label="Preferred requirements cannot be fulfilled"
				value="preferred_requirements_cannot_be_fulfilled"
				onChange={() => handleOnChange('preferred_requirements_cannot_be_fulfilled')}
				checked={cancellationReason === 'preferred_requirements_cannot_be_fulfilled'}
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
