import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const ACTIONS = ['change_password', 'deactivate'];

function ActionContent({ onClickCta = () => {} }) {
	return (
		<div className={styles.action_container}>

			{ACTIONS.map((actionKey) => (
				<Button
					key={actionKey}
					type="button"
					themeType="tertiary"
					className={styles.cta_text}
					onClick={() => onClickCta(actionKey)}
				>

					<div>{startCase(actionKey)}</div>

				</Button>

			))}
		</div>
	);
}

export default ActionContent;
