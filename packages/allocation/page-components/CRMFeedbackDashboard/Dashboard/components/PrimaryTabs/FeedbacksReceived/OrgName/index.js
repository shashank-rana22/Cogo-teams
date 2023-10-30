import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

function OrgName({ item = {} }) {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '' } = query;

	const {
		lead_organization = {},
		lead_organization_id = '',
		organization = {},
		organization_id = '',
		source_id = '',
		source_type = '',
	} = item || {};

	const urlMapping = useMemo(
		() => ({
			user              : `${window.location.origin}/${partner_id}/details/demand/${organization_id}`,
			organization      : `${window.location.origin}/${partner_id}/details/demand/${organization_id}`,
			lead_organization : `${window.location.origin}/${partner_id}/lead-organization/${lead_organization_id}`,
			lead_user         : organization_id
				? `${window.location.origin}/${partner_id}/details/demand/${organization_id}`
				: `${window.location.origin}/${partner_id}/lead-user/${source_id}`,
		}),
		[partner_id, organization_id, lead_organization_id, source_id],
	);

	return (
		<section
			role="presentation"
			className={styles.table_cell}
			onClick={() => window.open(urlMapping?.[source_type], '_blank')}
		>
			{lead_organization_id
				? startCase(lead_organization?.business_name || '___')
				: startCase(organization?.business_name || '___')}
		</section>
	);
}

export default OrgName;
