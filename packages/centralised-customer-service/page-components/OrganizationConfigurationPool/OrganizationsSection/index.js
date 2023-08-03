import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const OFFSET = 1;

function OrganizationsSection({ organizations = [] }) {
	return (
		<section className={styles.orgs}>
			{!isEmpty(organizations) ? (
				<Tooltip
					maxWidth={400}
					content={startCase(organizations[GLOBAL_CONSTANTS.zeroth_index].business_name)}
					placement="top"
					key={organizations[GLOBAL_CONSTANTS.zeroth_index].id}
				>
					<Pill className={styles.org_pill} size="sm" color="#F3FAFA">
						{organizations[GLOBAL_CONSTANTS.zeroth_index].business_name}
					</Pill>
				</Tooltip>
			) : (
				'-'
			)}

			{organizations.length > OFFSET && (
				<Tooltip
					maxWidth={400}
					content={organizations.map((org, index) => (index >= OFFSET ? (
						<Pill key={org.id} size="sm" color="#F3FAFA">
							{org.business_name}
						</Pill>
					) : null))}
					placement="top"
					interactive
				>
					<Pill className={styles.org_pill} size="sm" color="#F3FAFA">
						+
						{organizations.length - OFFSET}
						{' '}
						More
					</Pill>
				</Tooltip>
			)}
		</section>
	);
}

export default OrganizationsSection;
