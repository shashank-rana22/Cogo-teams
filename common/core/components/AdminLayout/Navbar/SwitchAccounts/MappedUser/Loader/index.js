import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div
			className={styles.container}
		>
			<div
				className={styles.active_profile}
			>
				<div>
					<Placeholder type="circle" radius="30px" margin="0px 5px" />
				</div>
				<div className={styles.profile_container}>
					<div className={styles.profile_pic}>
						<Placeholder height="30px" width="30px" />
					</div>
					<div>
						<div
							className={styles.profile_name}
						>
							<Placeholder height="12px" width="100px" />
						</div>
						<div
							className={styles.profile_email}
						>
							<Placeholder height="10px" width="120px" margin="20px 0px 0px 0px" />

						</div>
					</div>
				</div>
			</div>
			<div
				className={styles.icon_container}
			>
				<Placeholder height="20px" width="20px" margin="0px 0px 0px 0px" />
			</div>
		</div>
	);
}

export default Loader;
