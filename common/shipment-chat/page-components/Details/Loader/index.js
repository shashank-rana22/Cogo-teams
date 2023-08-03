import { Button, Placeholder, Loader as ToggleLoader } from '@cogoport/components';
import { IcMCross, IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Loader({ setShow = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.serial_id}>
					<Placeholder height="18px" width="136px" />
				</div>

				<div className={styles.port_details_loading}>
					<div style={{ width: '120px' }}>
						<Placeholder className={styles.port_details_placeholder} />
						<Placeholder className={styles.port_details_placeholder} />
					</div>

					<IcMPortArrow className={styles.port_arrow} />

					<div style={{ width: '120px' }}>
						<Placeholder className={styles.port_details_placeholder} />
						<Placeholder className={styles.port_details_placeholder} />
					</div>
				</div>

				<Placeholder height="18px" width="80px" />

				<Button
					themeType="linkUi"
					style={{ padding: '0px' }}
					onClick={() => { setShow(false); }}
				>
					<IcMCross />
				</Button>
			</div>

			<div className={styles.filter_box}>
				<div style={{ marginRight: '8px' }}>Show Starred Messages</div>

				<ToggleLoader themeType="secondary" />
			</div>

		</div>
	);
}

export default Loader;
