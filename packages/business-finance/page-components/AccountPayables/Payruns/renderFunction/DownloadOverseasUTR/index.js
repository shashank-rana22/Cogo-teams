import { Button, Popover } from '@cogoport/components';
import { IcMDownload, IcMOverflowDot } from '@cogoport/icons-react';
import React from 'react';

import useDownloadOverseasUTR from '../../hooks/useDownloadOverseasUTR';

function PopoverContent({ id = '' }) {
	const { loading, overseasUTRdownload } = useDownloadOverseasUTR();
	return (
		<div>
			Overseas UTR
			<Button
				style={{ marginTop: '4px' }}
				themeType="tertiary"
				onClick={() => overseasUTRdownload(id)}
				size="sm"
				disabled={loading}
			>
				<IcMDownload height={16} width={16} />
			</Button>
		</div>
	);
}
function DownloadOverseasUTR({ itemData = {} }) {
	const { id } = itemData;
	return (
		<div>
			<Popover
				placement="left"
				render={<PopoverContent id={id} />}
			>
				<div>
					<IcMOverflowDot height={16} width={16} style={{ cursor: 'pointer' }} />
				</div>
			</Popover>
		</div>
	);
}

export default DownloadOverseasUTR;
