import { cl, ButtonIcon } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

const TIMEOUT_TIME = 800;

function ToggleLocation({
	formValues = {},
	setFormValues = () => {},
	style = {},
}) {
	const [active, setActive] = useState(false);

	const { origin = {}, destination = {} } = formValues || {};

	const handleToggle = () => {
		setActive(true);

		setFormValues((prev) => ({
			...prev,
			origin      : { ...(destination || {}) },
			destination : { ...(origin || {}) },
		}));

		setTimeout(() => {
			setActive(false);
		}, TIMEOUT_TIME);
	};

	return (
		<div className={styles.container} style={style}>
			<ButtonIcon
				className={cl`${styles.button} ${active && styles.active}`}
				size="sm"
				icon={<IcMSort className={styles.arrow_icon} />}
				themeType="primary"
				disabled={isEmpty(origin) && isEmpty(destination)}
				onClick={handleToggle}
			/>
		</div>
	);
}

export default ToggleLocation;
