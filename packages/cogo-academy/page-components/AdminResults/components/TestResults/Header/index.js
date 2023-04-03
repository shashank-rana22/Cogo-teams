import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ header_data, loading = false }) {
	const { setToggleState } = header_data || {};

	return (
		<div className={styles.header_row}>
			<div>
				<div className={styles.heading}>{header_data.test_name || ' '}</div>

				<p className={styles.validity_label}>
					Validity:
					{' '}
					<span className={styles.validity}>
						{format(header_data.validity_start, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) || ' '}
						{' '}
						-
						{' '}
						{format(header_data.validity_end, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) || ' '}
					</span>
				</p>
			</div>

			<div style={{ zIndex: '10' }}>
				<Toggle
					name="a4"
					size="md"
					disabled={loading}
					offLabel="Level of Difficulty"
					onLabel="Topic wise"
					onChange={() => setToggleState((prev) => (!prev))}
				/>
			</div>
		</div>
	);
}

export default Header;
