import { Tooltip } from '@cogoport/components';

const STARTING_SUBSTRING_LENGTH = 0;
function RenderTooltipComponent({ content, maxLength }) {
	if (content.length <= maxLength) {
		return <div>{content}</div>;
	}
	return (
		<Tooltip maxWidth={500} interactive placement="top" content={content}>
			<div>{`${content.substring(STARTING_SUBSTRING_LENGTH, maxLength)}...`}</div>
		</Tooltip>
	);
}
export default RenderTooltipComponent;
