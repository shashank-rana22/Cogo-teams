import { Tooltip } from '@cogoport/components';

const renderTooltip = (content, maxLength) => {
	if (content.length > maxLength) {
		return (
			<Tooltip maxWidth={500} interactive placement="top" content={content}>
				<div>{`${content.substring(0, maxLength)}...`}</div>
			</Tooltip>
		);
	}
	return content;
};
export default renderTooltip;
