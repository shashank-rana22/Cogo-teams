import { Button, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Header(props) {
	const { onClickCreateReqBtn, loading, onChangeParams, toggleValue } = props;

	// Todo search filter should expand on clicking

	return (
		<div className={styles.container}>
			<Toggle
				name="allocation_type"
				size="md"
				offLabel="Organization"
				onLabel="Partner"
				disabled={loading}
				value={toggleValue}
				onChange={(e) => onChangeParams({
					filters:
					{ service_type: e?.target?.checked ? 'partner' : 'organization' },
				})}
			/>

			<div className={styles.filter_and_create}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
				>
					FILTER
					<IcMFilter style={{ marginLeft: '4px' }} />

					<div className={styles.filter_dot} />
				</Button>

				<Button
					size="md"
					themeType="accent"
					disabled={loading}
					onClick={onClickCreateReqBtn}
				>
					CREATE REQUEST
				</Button>
			</div>
		</div>
	);
}

export default Header;
