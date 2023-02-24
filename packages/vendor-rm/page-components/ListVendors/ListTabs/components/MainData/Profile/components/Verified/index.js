/* eslint-disable max-len */
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Verified({ data = {} }) {
	const value = startCase(data?.vendor_details?.kyc_status);
	if (value === 'Verified') {
		return (
			<div
				className={styles.main}
				style={{
					background : '#E2FFE7',
					border     : '1px solid #89E297',
				}}
			>
				<div
					className={styles.icon}
				>
					<IcCFtick />
				</div>
				<div
					className={styles.dis}
					style={{
						color: '#67c676',
					}}
				>
					{value}
				</div>
			</div>
		);
	}
	if (value === 'Rejected') {
		return (
			<div
				className={styles.main}
				style={{
					background : '#fdcfcf',
					border     : '1px solid #ED3726',
				}}
			>
				<div
					className={styles.icon}
				>
					<IcCFcrossInCircle />
				</div>
				<div
					className={styles.dis}
					style={{ color: '#ED3726' }}
				>
					{value}
				</div>
			</div>
		);
	}
	return (
		<div
			className={styles.main}
			style={{
				background : '#fdd9b5',
				border     : '1px solid #F68B21',
			}}
		>
			<div
				className={styles.icon}
			>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc-pending-icon.svg" alt="pending" />
			</div>
			<div
				className={styles.dis}
				style={{
					color: '#F68B21',
				}}
			>
				{value}
			</div>
		</div>
	);
}

export default Verified;
