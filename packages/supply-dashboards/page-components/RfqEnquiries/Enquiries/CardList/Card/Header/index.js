import { Tags } from '@cogoport/components';
import { IcMFcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ item }) {
	const service = item?.service_type.split('_')[0];
	const inco_term_mapping = {
		cif : 'export',
		cfr : 'export',
		cpt : 'export',
		cip : 'export',
		dat : 'export',
		dap : 'export',
		ddp : 'export',
		fob : 'import',
		exw : 'import',
		fca : 'import',
		fas : 'import',
	};
	const trade_type = startCase(inco_term_mapping[item?.inco_term]);
	return (
		<div className={styles.heading}>
			<div className={styles.service}>
				<IcMFcl width={30} height={30} style={{ padding: '4px' }} />
				{service}
			</div>
			<div>
				<Tags themeType="blue">{trade_type}</Tags>
			</div>
		</div>

	);
}
export default Header;
