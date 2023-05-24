import { Tooltip } from '@cogoport/components';

const showInTooltop = (inTooltip, value) => (
	<Tooltip content={inTooltip}>
		<div>
			{value}
		</div>
	</Tooltip>
);

export default showInTooltop;
