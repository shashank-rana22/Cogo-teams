import { Button } from '@cogoport/components';
import React from 'react';

import { BUTTON_MAPPING } from '../../constants/mailConstants';

import styles from './styles.module.css';

function MailActions({
	handleClick = () => {},
}) {
	return (
		<div className={styles.buttons_flex}>
			{BUTTON_MAPPING.map((eachButton) => {
				const { buttonName, icon: Icon, key } = eachButton || {};

				return (
					<Button
						key={key}
						themeType="secondary"
						size="sm"
						className={styles.styled_button}
						onClick={() => handleClick({ buttonType: key })}
					>
						<Icon className={styles.icon} />
						<div className={styles.button_text}>
							{buttonName}
						</div>
					</Button>
				);
			})}
		</div>
	);
}

export default MailActions;
