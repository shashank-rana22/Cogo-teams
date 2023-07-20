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
				value="profitability_issue"
				onChange={() => handleOnChange('profitability_issue')}
				checked={cancellationReason === 'profitability_issue'}
			/>
			<Radio
				label="Incorrect requirements provided"
				value="incorrect_requirements_provided"
				onChange={() => handleOnChange('incorrect_requirements_provided')}
				checked={cancellationReason === 'incorrect_requirements_provided'}
			/>
			<Radio
				label="Preferred requirements cannot be fulfilled"
				value="preferred_requirements_cannot_be_fulfilled"
				onChange={() => handleOnChange('preferred_requirements_cannot_be_fulfilled')}
				checked={cancellationReason === 'preferred_requirements_cannot_be_fulfilled'}
			/>
			<Radio
				label="Space/inventory not available"
				value="space_unavailable"
				onChange={() => handleOnChange('space_unavailable')}
				checked={cancellationReason === 'space_unavailable'}
			/>
			<Radio
				label="Preferred line not available"
				value="preferred_line_not_available"
				onChange={() => handleOnChange('preferred_line_not_available')}
				checked={cancellationReason === 'preferred_line_not_available'}
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
