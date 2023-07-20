import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcAShipAmber, IcASchedules } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Header({ data = {}, loading = false }) {
	const {
		ongoing_shipments = '', risk_prone_shipments = '', container_movement_count = '',
		bl_do_release_count = '', both_count = '', risk_free_shipments = '',
	} = data?.stats || {};
	const TAB_MAPPING = [
		{
			label : 'Container Movement',
			value : container_movement_count,
		},
		{
			label : 'BL/DO Release',
			value : bl_do_release_count,
		},
		{
			label : 'Both',
			value : both_count,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.div_container}>
				<div className={styles.shipment_icon}>
					<IcAShipAmber height={120} width={120} />
				</div>
				<div className={styles.ongoing_container}>
					<div className={styles.count}>
						{loading ? <Placeholder className={styles.loader} />
							: ongoing_shipments || '-'}
					</div>
					<div className={styles.count_text}>
						ongoing shipment
					</div>
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
						{loading ? <Placeholder className={styles.loader} />
							: risk_prone_shipments || '-'}
					</div>
				</div>
				<div className={styles.vr} />
				{TAB_MAPPING.map((item) => (
					<div className={styles.sub_container} key={item.label}>
						<div className={styles.release_count}>
							{loading ? <Placeholder className={styles.loader} />
								: item.value || '-'}
						</div>
						<div>
							{item.label}
						</div>
					</div>
				))}

			</div>
			<div className={styles.risk_free_container}>
				<div className={styles.sub_container}>
					<div className={styles.release_count}>
						{loading ? <Placeholder className={styles.loader} />
							: risk_free_shipments || '-'}
					</div>
					<div className={styles.release_count}>
						Risk Free
					</div>

				</div>
				<div className={styles.image}>
					<img
						src={GLOBAL_CONSTANTS.image_url.risk_free}
						alt="badge-icon"
					/>
				</div>
			</div>

		</div>
	);
}

export default Header;
