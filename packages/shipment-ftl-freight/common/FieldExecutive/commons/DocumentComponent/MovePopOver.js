import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import PopContent from './PopContent';

function MovePopOver(props) {
	const [visible, setVisible] = useState(false);
	if (visible) {
		return (
			<Popover
				visible={visible}
				onClickOutside={() => setVisible(false)}
				placement="right"
				content={
					<PopContent {...props} setVisible={setVisible} visible={visible} />
				}
			>
				<Button
					themeType="secondary"
					size="sm"
					onClick={() => setVisible(!visible)}
				>
					Move
				</Button>
			</Popover>
		);
	}
	return (
		<Button
			themeType="secondary"
			size="sm"
			onClick={() => setVisible(!visible)}
		>
			Move
		</Button>
	);
}

export default MovePopOver;
