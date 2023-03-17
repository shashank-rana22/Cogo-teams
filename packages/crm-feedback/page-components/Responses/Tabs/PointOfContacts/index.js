import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import ResponseCard from '../../components/ResponseCard';
import LoadingState from '../../components/ResponseCard/LoadingState';

import styles from './styles.module.css';

function PointOfContacts({ activeTab = '' }) {
	const list = [
		{
			id                            : '1',
			name                          : 'Anmol Bansal',
			email                         : 'anmol.bansal@cogoport.com',
			alternate_email               : 'abanmolbansal5@gmail.com',
			mobile_number                 : '9899909357',
			alternate_mobile_number       : '9818999507',
			whatsapp_number               : '9899909357',
			mobile_country_code           : '+91',
			whatsapp_country_code         : '+91',
			alternate_mobile_country_code : '+91',
			work_scopes                   : ['Frontend Developer', 'UI Designer', 'UX Designer', 'Product Manager'],
		},
	];

	const loading = false;

	if (loading) {
		return (
			<LoadingState />
		);
	}

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty}>
				<EmptyState height="280px" width="auto" flexDirection="column" textSize="20px" />
			</div>

		);
	}

	return (
		<div className={styles.container}>
			{(list).map((user, index) => (
				<ResponseCard
					key={user.id}
					user={user}
					index={index}
					// loading={loading}
					activeTab={activeTab}
				/>
			))}
		</div>
	);
}

export default PointOfContacts;
