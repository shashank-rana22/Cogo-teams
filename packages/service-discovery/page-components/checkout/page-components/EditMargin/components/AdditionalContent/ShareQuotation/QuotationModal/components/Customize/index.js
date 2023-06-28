import { useSelector } from '@cogoport/store';

import EmailComponent from './components/EmailComponent';
import getPrefilledValues from './getPrefilledValues';
import styles from './styles.module.css';

function Customize({ detail, organization, selectedModes, widths = {} }) {
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile?.id,
	}));

	const prefilledValues = getPrefilledValues(detail, [
		organization?.agent_id,
		agent_id,
	]);

	return (
		<div className={styles.container}>
			{selectedModes.includes('email') ? (
				<div className={styles.email_component}>
					<EmailComponent />
				</div>
			) : null}
		</div>
	);
}

export default Customize;
