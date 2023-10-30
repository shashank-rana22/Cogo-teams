import { Tooltip } from '@cogoport/components';
import React from 'react';

function ToolTipWrapper({ text = '', maxlength = 12, maxWidth = 500 }) {
	if (text?.length > maxlength) {
		return (
			<Tooltip content={text} maxWidth={maxWidth} placement="top-start" interactive>
				<span>{`${(text || '')?.slice(0, maxlength)}...`}</span>
			</Tooltip>
		);
	}

	return <span>{text}</span>;
}

export default ToolTipWrapper;
