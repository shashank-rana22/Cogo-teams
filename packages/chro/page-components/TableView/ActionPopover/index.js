import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import SubmitSection from './SubmitSection';

export default function ActionPopover({
	item, onFinalSubmit = () => {},
	updateOfferLetterLoading = false, error = false, setError = () => {},
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
						error={error}
						setError={setError}
						employeeId={id}
						setVisible={setVisible}
						onFinalSubmit={onFinalSubmit}
						updateOfferLetterLoading={updateOfferLetterLoading}
					/>
				)}
			>
				<Button
					themeType="secondary"
					onClick={() => setVisible(() => !visible)}
					disabled={updateOfferLetterLoading}
				>
					Reject
				</Button>
			</Popover>
		</div>
	);
}
