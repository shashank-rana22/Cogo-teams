import { Placeholder, Loader as ToggleLoader } from '@cogoport/components';
import { IcMCross, IcMPortArrow, IcMProfile } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Loader({ setShow = () => {} }) {
	return (
		// <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
		// 	<Placeholder width="220px" height="50px" margin="16px 8px" />
		// 	<Placeholder width="220px" height="50px" margin="16px 8px" />
		// </div>
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.serial_id}>
					<Placeholder height="20px" width="130px" />
				</div>

				<div className={styles.port_details_loading}>
					<div>
						<Placeholder className={styles.port_details_placeholder} />
						<Placeholder className={styles.port_details_placeholder} />
					</div>

					<IcMPortArrow style={{ width: '1.2em', height: '1.2em' }} />

					<div>
						<Placeholder className={styles.port_details_placeholder} />
						<Placeholder className={styles.port_details_placeholder} />
					</div>
				</div>

				<div className={styles.button}>
					<IcMProfile width={12} height={12} />

					<Placeholder height="10px" />
				</div>

				<div
					className={styles.close_icon}
					role="button"
					tabIndex={0}
					onClick={() => setShow(false)}
				>
					<IcMCross />
				</div>
			</div>

			<div className={styles.filter_box}>
				<div style={{ color: '#221F20' }}>Show Starred Messages</div>

				<ToggleLoader themeType="secondary" />
			</div>

		</div>
	);
}

export default Loader;
