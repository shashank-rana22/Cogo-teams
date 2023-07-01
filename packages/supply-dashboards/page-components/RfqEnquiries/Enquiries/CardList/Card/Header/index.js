import { Pill } from '@cogoport/components';
import { IcMFcl, IcMAir, IcMLcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getIncoTermMapping from '../../../../helpers/getIncoTermMapping';

import styles from './styles.module.css';

function Header({ item }) {
	const service = item?.detail?.service_type.split('_')[0];
	const rank = item?.negotiation_rank;
	const trade_type = startCase(getIncoTermMapping[item?.detail?.inco_term]);
	let Icon = IcMFcl;
	if (service === 'air') {
		Icon = IcMAir;
	} else if (service === 'lcl') {
		Icon = IcMLcl;
	}
	return (
		<div className={styles.heading}>
			<div className={styles.service}>
				<div className={styles.service_name}>
					<Icon width={30} height={30} style={{ padding: '4px' }} />
					{service}
				</div>
				<div>
					{rank ? (
						<Pill color="#4F4F4F">
							<div style={{ fontSize: '10px', color: '#ffffff' }}>
								Under Negotiation
								{' '}
								{rank}
							</div>
						</Pill>
					) : null}
				</div>
			</div>
			<div>
				<Pill color="blue">{trade_type}</Pill>
			</div>
		</div>

	);
}
export default Header;
