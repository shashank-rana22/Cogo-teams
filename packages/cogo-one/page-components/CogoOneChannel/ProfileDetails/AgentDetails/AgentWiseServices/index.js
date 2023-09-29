import { cl, Placeholder } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import useGetOrganizationServices from '../../../../../hooks/useGetOrganizationServices';

import styles from './styles.module.css';

const STATUS_MAPPING = {
	active   : 'Active',
	inactive : 'Inactive',
};

function AgentWiseServices({ orgId = '' }) {
	const { list = [], loading = false } = useGetOrganizationServices({ orgId });

	if (isEmpty(list)) {
		return null;
	}

	return loading ? <Placeholder width="100%" height="80px" margin="10px 0 0" /> : (
		<>
			<div className={styles.title}>Services</div>
			<div className={styles.container}>
				<div className={styles.column_name}>
					<div className={styles.service}>Service Type</div>
					<div className={styles.status}>Status</div>
					<div className={styles.reasons}>Reason</div>
				</div>
				<div className={styles.list_services}>
					{(list || []).map((item) => {
						const { status = '', key = '', rejection_reason = '' } = item || {};

						return (
							<div className={styles.each_row} key={`${key}_${status}`}>
								<div className={styles.service}>{startCase(key)}</div>
								<div className={cl`${styles.status} 
                            ${status === 'active' ? styles.active : styles.inactive}`}
								>
									{STATUS_MAPPING?.[status]}
								</div>
								<div className={styles.reasons}>{rejection_reason || '-'}</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default AgentWiseServices;
