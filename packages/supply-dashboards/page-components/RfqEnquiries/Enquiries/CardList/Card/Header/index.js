import { Tags } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getIncoTermMapping from '../../../../helpers/getIncoTermMapping';

import styles from './styles.module.css';

function Header({ item }) {
	const service = item?.detail?.service_type.split('_')[0];
	const trade_type = startCase(getIncoTermMapping[item?.detail?.inco_term]);
	const items = [{ children: trade_type, color: 'blue' }];
	return (
		<div className={styles.heading}>
			<div className={styles.service}>
				<IcMFcl width={30} height={30} style={{ padding: '4px' }} />
				{service}
			</div>
			<div>
				<Tags items={items} closable />
			</div>
		</div>

	);
}
export default Header;
