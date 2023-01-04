import { IcMAir, IcMFcl, IcMLcl } from '@cogoport/icons-react';

import PortPair from '../../../PageView/List/Card/PortPair';

import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : IcMFcl,
	lcl_freight : IcMLcl,
	air_freight : IcMAir,
};

function Content({ portPair, activePair, handlePortChange }) {
	const Element = iconMapping[portPair?.service_type];
	return (
		<div
			className={activePair?.uniqueId === `${portPair?.origin_code} ${portPair?.destination_code}`
				? styles.port_pair_active : ''}
		>
			<div className={styles.sub_container}>
				<div className={styles.service}>
					<Element width={30} height={30} style={{ padding: '4px' }} />
					{`${portPair?.service_type.split('_')[0]} ${portPair?.service_type.split('_')[1]}`}
				</div>

				<div className={styles.pair}>
					<PortPair portPair={portPair} handlePortChange={handlePortChange} detailView />
					<div className={styles.line} />
				</div>
			</div>
		</div>
	);
}

export default Content;
