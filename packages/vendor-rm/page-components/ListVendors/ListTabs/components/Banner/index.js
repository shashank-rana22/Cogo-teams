import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import formatArrayValues from '../../../../../utils/formatArrayValues';

import styles from './styles.module.css';

const keysToDisplay = [
	'vendor_id',
	'kyc_status',
	'registration_number',
	'service_category',
	'service_sub_category',
	'created_on',
];

function Banner({ data = {} }) {
	const { vendor_details = {}, services = [] } = data;

	const { kyc_status, serial_id, registration_number, created_at } = vendor_details || {};

	const serviceCategories = [...new Set(services.map((service) => service.category))];

	const serviceSubCategories = [...new Set(services.map((service) => service.sub_category))];

	const checkVerified = (value) => {
		if (value === 'verified') {
			return (
				<>
					<IcCFtick />
					<span style={{ color: '#67C676' }}>{startCase(value)}</span>
				</>
			);
		}

		if (value === 'rejected') {
			return (
				<>
					<IcMCrossInCircle fill="#ED3726" />
					<span style={{ color: '#ED3726' }}>{startCase(value)}</span>
				</>
			);
		}

		return (
			<>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/kyc-pending-icon.svg"
					alt="pending"
					className={styles.pending_icon}
				/>
				<span style={{ color: '#F68B21' }}>{startCase(value)}</span>
			</>
		);
	};

	const valuesToDisplay = {
		vendor_id: {
			label : 'Vendor ID',
			value : (
				<div>
					#
					{serial_id}
				</div>
			),
		},
		kyc_status: {
			label : 'KYC Status',
			value : checkVerified(kyc_status),
		},
		registration_number: {
			label : 'Registration Number',
			value : registration_number,
		},
		service_category: {
			label : 'Service Category',
			value : formatArrayValues(serviceCategories),
		},
		service_sub_category: {
			label : 'Service Sub-Catogory',
			value : formatArrayValues(serviceSubCategories),
		},
		created_on: {
			label: 'Created on',
			value:
			format(
				created_at,
				GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				{},
				false,
			),
		},
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>
				{data?.vendor_details?.business_name}
			</div>

			<div className={styles.content}>
				{keysToDisplay.map((item) => (
					<div className={styles.item}>
						<div className={styles.label}>
							{valuesToDisplay[item].label}
						</div>

						<div className={styles.value}>
							{valuesToDisplay[item].value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Banner;
