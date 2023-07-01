import { Tooltip } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';

function PercentagePercentile({ formvalues, control, value }) {
	if (value === 'percentile_checked') {
		return (
			<>
				<InputController
					name="percentile"
					placeholder="Type Percentile"
					control={control}
					size="sm"
					type="number"
					disabled={!formvalues?.filtered_users?.includes('percentile_checked')}
				/>
				<Tooltip
					theme="light"
					content="Type Minimum Percentile for retest eligibilty"
					maxWidth="none"
					placement="right"
					interactive
				>

					<IcMInfo style={{ marginLeft: 8 }} />

				</Tooltip>
			</>
		);
	}

	return (
		<>
			<InputController
				name="percentage"
				placeholder="Type Percentage"
				control={control}
				size="sm"
				type="number"
				disabled={!formvalues.filtered_users?.includes('percentage_checked')}
			/>
			<Tooltip
				theme="light"
				content="Type Minimum Percentage for retest eligibilty"
				maxWidth="none"
				placement="right"
				interactive
			>
				<IcMInfo style={{ marginLeft: 8 }} />

			</Tooltip>
		</>
	);
}

export default PercentagePercentile;
