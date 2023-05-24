import { IcAShipAmber, IcASchedules } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.shipment_icon}>
				<IcAShipAmber height={120} width={120} />
			</div>
			<div className={styles.ongoing_container}>
				<div className={styles.count}>
					1200
				</div>
				<div className={styles.count_text}>
					ongoing shipment
				</div>
			</div>
			<div className={styles.risk_prone}>
				<div>
					<IcASchedules height={90} width={90} />
				</div>
				<div className={styles.risk}>
					<div>
						Risk Prone :
						{'  '}
					</div>
					<div className={styles.risk_prone_count}>
						{'  '}
						94
					</div>
				</div>
				<div className={styles.vr} />
				<div className={styles.sub_container}>
					<div className={styles.release_count}>
						24
					</div>
					<div>
						Container Movement
					</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.release_count}>
						24
					</div>
					<div>
						BL/DO Release
					</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.release_count}>
						30
					</div>
					<div>
						Both
					</div>
				</div>
			</div>
			<div className={styles.risk_free_container}>
				<div className={styles.sub_container}>
					<div className={styles.release_count}>
						1106
					</div>
					<div className={styles.release_count}>
						Risk Free
					</div>

				</div>
				<div className={styles.image}>
					<img
						// src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc-verified.svg"
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/MicrosoftTeams-image (14).png"
						alt="badge-icon"
					/>
				</div>
			</div>

		</div>
	);
}

export default Header;
