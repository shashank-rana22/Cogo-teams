import { Tooltip } from '@cogoport/components';

const STARTING_SUBSTRING_LENGTH = 0;
const renderTooltip = (content, maxLength) => {
	if (content?.length > maxLength) {
		return (
			<Tooltip maxWidth={500} interactive placement="top" content={content}>
				<div>{`${content.substring(STARTING_SUBSTRING_LENGTH, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
};
export default renderTooltip;
