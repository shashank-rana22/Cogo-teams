import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import SubmitSection from './SubmitSection';

export default function ActionPopover({
	item,
	onFinalSubmit = () => {},
}) {
	const [visible, setVisible] = useState(false);

	const { id = '' } = item || {};

	return (
		<div className={styles.popover_container}>
			<Popover
				placement="left"
				trigger="click"
				caret={false}
				visible={visible}
				render={(
					<SubmitSection
						employeeId={id}
						setVisible={setVisible}
						onFinalSubmit={onFinalSubmit}
					/>
				)}
			>
				<Button themeType="secondary" onClick={() => setVisible(() => !visible)}>
					Reject
				</Button>
			</Popover>
		</div>
	);
}
