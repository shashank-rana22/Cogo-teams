import { Tooltip } from '@cogoport/components';
import React from 'react';

const MIN_LENGTH = 0;

function ToolTipWrapper({ text = '', maxlength = 12 }) {
	if (text?.length > maxlength) {
		return (
			<Tooltip content={text} placement="top-start" interactive>
				<span>{`${(text || '')?.slice(MIN_LENGTH, maxlength)}...`}</span>
			</Tooltip>
		);
	}

	return <span>{text}</span>;
}

export default ToolTipWrapper;
