import { Tooltip } from '@cogoport/components';

const DEFAULT_MAX_LENGTH = 0;
const renderTooltip = (content, maxLength) => {
	if (content.length > maxLength) {
		return (
			<Tooltip maxWidth={500} interactive placement="top" content={content}>
				<div>{`${content.substring(DEFAULT_MAX_LENGTH, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
};
export default renderTooltip;
