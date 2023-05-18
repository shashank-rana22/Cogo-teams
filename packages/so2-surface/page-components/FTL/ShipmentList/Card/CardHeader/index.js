import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import styles from './styles.module.css';

export default function CardHeader({ item = {} }) {
	const { source } = item || {};
	const displaySource = source === 'direct' ? 'Sell Without Buy' : startCase(source || '');

	return (
		<div className={styles.card_header}>
			<Pill
				color="var(--color-secondary-3)"
				className={styles.header_pills}
			>
				{displaySource}
			</Pill>
		</div>
	);
}
