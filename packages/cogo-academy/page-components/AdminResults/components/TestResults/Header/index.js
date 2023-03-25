import { Toggle } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ header_data }) {
	const { setToggleState, toggleState } = header_data;
	return (
		<div className={styles.header_row}>
			<div>
				<div className={styles.heading}>{header_data.test_name || ' '}</div>
				<p className={styles.validity_label}>
					Validity:
					{' '}
					<span className={styles.validity}>
						{format(header_data.validity_start, 'dd MMM\' yy') || ' '}
						{' '}
						-
						{' '}
						{format(header_data.validity_end, 'dd MMM\' yy') || ' '}
					</span>
				</p>
			</div>
			<div style={{ zIndex: '10' }}>
				<Toggle
					name="a4"
					size="md"
					disabled={false}
					offLabel="Level of Difficulty"
					onLabel="Topic wise"
					onChange={() => setToggleState(!toggleState)}
				/>
			</div>
		</div>
	);
}

export default Header;
