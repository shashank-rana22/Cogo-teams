/* eslint-disable max-len */
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Verified({ vendor_details = {} }) {
	const { kyc_rejection_reason, kyc_status } = vendor_details || {};

	if (kyc_status === 'verified') {
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
					{startCase(kyc_status)}
				</div>
			</div>
		);
	}

	if (kyc_status === 'rejected') {
		return (
			<div
				className={styles.main}
				style={{
					background    : '#fdcfcf',
					border        : '1px solid #ED3726',
					flexDirection : 'column',
				}}
			>
				<div className={styles.kyc_status_icon}>
					<div
						className={styles.icon}
					>
						<IcCFcrossInCircle />
					</div>
					<div
						className={styles.dis}
						style={{ color: '#ED3726' }}
					>
						{startCase(kyc_status)}
					</div>
				</div>
				<div
					className={styles.dis}
					style={{ color: '#ED3726' }}
				>
					Rejection reason -
					{' '}
					{kyc_rejection_reason}
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
				{startCase(kyc_status)}
			</div>
		</div>
	);
}

export default Verified;
