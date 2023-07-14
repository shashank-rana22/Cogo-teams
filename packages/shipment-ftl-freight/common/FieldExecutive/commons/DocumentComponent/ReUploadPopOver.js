import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import ReUploadContent from './ReUploadContent';

function ReUploadPopOver(props) {
	const [visible, setVisible] = useState(false);
	if (visible) {
		return (
			<Popover
				theme="light"
				visible={visible}
				onClickOutside={() => setVisible(false)}
				placement="bottom"
				content={(
					<ReUploadContent
						{...props}
						setVisible={setVisible}
						visible={visible}
					/>
				)}
			>
				<Button
					themeType="secondary"
					size="sm"
					style={{ marginRight: '3px' }}
					onClick={() => setVisible(!visible)}
				>
					Re - Upload
				</Button>
			</Popover>
		);
	}
	return (

		<Button
			themeType="secondary"
			size="sm"
			style={{ marginRight: '3px' }}
			onClick={() => setVisible(!visible)}
		>
			Re - Upload
		</Button>
	);
}

export default ReUploadPopOver;
