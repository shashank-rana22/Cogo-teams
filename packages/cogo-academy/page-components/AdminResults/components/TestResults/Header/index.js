import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
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
						<div className={styles.status_time}>
							<div>
								{format(
									header_data.validity_start,
									GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								)}

							</div>
							<div style={{ marginLeft: '8px' }}>
								{format(
									header_data.validity_start,
									GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								)}

							</div>

							<div className={styles.middle_div}><IcMArrowNext height={16} width={16} /></div>

							<div>
								{format(
									header_data.validity_end,
									GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								)}

							</div>

							<div style={{ marginLeft: '8px' }}>
								{format(
									header_data.validity_end,
									GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								)}

							</div>

						</div>
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
