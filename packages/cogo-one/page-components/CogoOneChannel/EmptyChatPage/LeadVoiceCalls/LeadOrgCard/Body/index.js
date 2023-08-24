import { Avatar, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import MachineIntelligence from './MachineIntelligence';
import styles from './styles.module.css';

function Body({ eachItem = {}, handlePlaceCall = () => {} }) {
	const {
		name = 'User',
		mobile_number = '',
		mobile_country_code = '',
		lead_user_id = '',
		lead_organization_id = '',
		mobile_number_verified = false,
	} = eachItem || {};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={styles.name_flex}>
					<Avatar
						src={GLOBAL_CONSTANTS.image_url.user_logo}
						alt="img"
						className={styles.avatar_styles}
					/>
					<Tooltip
						content={name || 'User'}
						placement="bottom"
					>
						<div className={styles.name}>{startCase(name) || 'User'}</div>
					</Tooltip>
					{mobile_number_verified ? <IcCFtick className={styles.tick_icon} /> : null}
				</div>
				<div
					className={styles.call_icon_border}
					style={{ cursor: mobile_number ? 'pointer' : 'not-allowed' }}
				>
					<IcMCall
						className={styles.call_icon}
						onClick={() => {
							handlePlaceCall({
								number     : mobile_number,
								code       : mobile_country_code,
								userName   : name,
								leadUserId : lead_user_id,
								leadOrgId  : lead_organization_id,
							});
						}}
					/>
				</div>
			</div>
			<MachineIntelligence eachItem={eachItem} />
		</div>
	);
}

export default Body;
