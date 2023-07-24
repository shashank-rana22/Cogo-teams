import { IcMVerySad } from '@cogoport/icons-react';

import styles from './styles.module.css';

const TEXT_MAPPING = {
	blocked_country:
		'We are sorry, We do not offer insurance for this port pair yet.',
	non_indian_search:
		'We are sorry, We offer insurance only for shipments that operates from/to India only.',
};

function EmptyState({ reason = '' }) {
	return (
		<div className={styles.sad_container}>
			<IcMVerySad width={40} height={40} />
			<p>{TEXT_MAPPING[reason]}</p>
		</div>
	);
}
export default EmptyState;
