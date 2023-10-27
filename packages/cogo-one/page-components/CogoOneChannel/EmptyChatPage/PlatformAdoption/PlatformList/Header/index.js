import { Tooltip, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import PlatFormAdoptionAssign from '../../../../../../common/PlatFormAdoptionAssign';
import { formatAccountType } from '../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

function Header({
	item = {}, escalationCycle = '', serialId = '', requestType = '', businessName = '', icon = null,
	tags = [], accountType = '',
}) {
	return (
		<div className={styles.header_info}>
			<div className={styles.cycle_section}>
				<div className={styles.serail_id}>
					ID :
					{' '}
					{serialId}
				</div>
				{escalationCycle ? (
					<div className={cl`${styles.cycle} ${styles[escalationCycle]}`}>
						{startCase(escalationCycle)}
					</div>
				) : null}
			</div>
			<div className={styles.wrap}>
				<div className={styles.user_info}>
					{icon}
					<div className={styles.org_details}>
						<Tooltip
							content={businessName}
							placement="top"
						>
							<div className={styles.businessName}>
								{startCase(requestType) || '-'}
							</div>
						</Tooltip>
						<div className={styles.lower_section}>
							<div className={styles.trade_name}>
								{startCase(businessName) || '-'}
							</div>
							<div className={styles.account_type}>
								{formatAccountType({ tags })?.[accountType]?.shortName}
							</div>
						</div>
					</div>
				</div>
				<PlatFormAdoptionAssign data={item} />
			</div>
		</div>
	);
}

export default Header;
