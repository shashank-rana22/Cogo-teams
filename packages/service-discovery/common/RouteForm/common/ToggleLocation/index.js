import { cl } from '@cogoport/components';
import { IcMSort } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ToggleLocation({
	formValues = {},
	setFormValues = () => {},
}) {
	const { origin = {}, destination = {} } = formValues || {};

	const handleToggle = () => {
		setFormValues((prev) => ({
			...prev,
			origin      : { ...(destination || {}) },
			destination : { ...(origin || {}) },
		}));
	};

	const isDisabled = isEmpty(origin) && isEmpty(destination);

	return (
		<div
			role="presentation"
			className={cl`${styles.container} ${isDisabled ? styles.disabled : {}}`}
			onClick={handleToggle}
			disabled
		>
			<IcMSort
				className={cl`${styles.arrow_icon} ${isDisabled ? styles.disabled : {}}`}
				width="14px"
				height="14px"
			/>
		</div>
	);
}

export default ToggleLocation;
