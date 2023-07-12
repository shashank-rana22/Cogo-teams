import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import useHeaderStats from '../../hooks/useHeaderStats';

import styles from './styles.module.css';

const keysToDisplay = [
	'serial_id',
	'business_name',
	'request_id',
	'request_type',
	'created_on',
];

const getOrganizationData = ({ lead_organization = {}, organization = {} }) => {
	if (isEmpty(lead_organization)) {
		return organization;
	}
	return lead_organization;
};

function Header() {
	const { data = {}, loading } = useHeaderStats();

	const {
		organization = {},
		lead_organization = {},
		created_at = '',
		request_type = '',
		serial_id: request_id,
	} = data;

	const sourceOrganization = getOrganizationData({ lead_organization, organization });

	const { serial_id, business_name } = sourceOrganization || {};

	const valuesToDisplay = {
		request_id: {
			label : 'Request ID',
			value : (
				<div>
					#
					{request_id || '__'}
				</div>),
		},

		request_type: {
			label : 'Request Type',
			value : <div>{startCase(request_type) || '__'}</div>,
		},

		serial_id: {
			label : 'Serial ID',
			value : (
				<div>
					#
					{serial_id}
				</div>
			),
		},

		business_name: {
			label : 'Business Name',
			value : <div>{startCase(business_name) || '__'}</div>,
		},

		created_on: {
			label : 'Created on',
			value : formatDate({
				date       : created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),

		},

	};

	if (loading) {
		return <Placeholder className={styles.loading} height="120px" width="100%" />;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.content}>
				{keysToDisplay.map((item) => (
					<div key={item} className={styles.item}>
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

export default Header;
