import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import SubmitSection from './SubmitSection';

export default function ActionPopover({
	ctcBreakup,
	onFinalSubmit = () => {},
}) {
	const [visible, setVisible] = useState(false);
	console.log('ctcBreakup', ctcBreakup);

	const onCheck = () => {
		setVisible(() => !visible);
	};

	return (
		<div className={styles.popover_container}>
			<Popover
				placement="left"
				trigger="click"
				caret={false}
				visible={visible}
				render={(
					<SubmitSection
						setVisible={setVisible}
						onFinalSubmit={onFinalSubmit}
					/>
				)}
			>
				<Button themeType="secondary" onClick={onCheck}>
					Reject
				</Button>
			</Popover>
		</div>
	);
}
