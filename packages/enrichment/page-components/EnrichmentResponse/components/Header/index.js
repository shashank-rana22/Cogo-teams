import { Avatar, Pill, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import useHeaderStats from '../../hooks/useHeaderStats';
import getSourceOrganizationData from '../../utils/get-source-organization-data';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function Header() {
	const { data = {}, loading } = useHeaderStats();

	const { lead_organization, organization } = data;

	const sourceOrganization = getSourceOrganizationData({ lead_organization, organization });

	const { business_name, serial_id = '' } = sourceOrganization;

	const str = business_name || '';
	const avatarName = `${str.split(' ')[GLOBAL_CONSTANTS.zeroth_index]} ${str.split(' ')[FIRST_INDEX] || ''}`;

	if (loading) {
		return <div className={styles.card}><Placeholder width="500px" height="80px" /></div>;
	}

	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				<span>
					<span className={styles.label}>	Organization Name:</span>
					<span className={styles.name}>{startCase(business_name || '--')}</span>
				</span>

				<Pill
					size="md"
					color="blue"
					className={styles.pill}
				>
					<span className={styles.label}>	ID:</span>
					<span className={styles.value}>{serial_id || 'Nil'}</span>
				</Pill>

			</div>
		</div>
	);
}

export default Header;
