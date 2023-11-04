import { startCase } from '@cogoport/utils';

import getQuantity from '../../../../../utils/getQuantity';
import getService from '../../../../../utils/getService';

import styles from './styles.module.css';

const SERVICE_MAPPING = {
	fcl_freight       : { label: 'FCL', color: '#436DF4' },
	lcl_freight       : { label: 'LCL', color: '#436DF4' },
	air_freight       : { label: 'Air', color: '#221F20' },
	fcl_freight_local : { label: 'FCL Local', color: '#133DC4' },
	lcl_freight_local : { label: 'LCL Local', color: '#133DC4' },
};

const ONE = 1;

function ServiceDetail({ item, service, formattedData }) {
	const { contentToShow, unit } = getQuantity({ portPairdata: formattedData, service });
	const Element = getService({ portPair: { service_type: service } });

	return (
		<div className={styles.container}>
			<div className={styles.service}>
				<Element width={24} height={24} style={{ color: SERVICE_MAPPING[service].color }} />
				{startCase(SERVICE_MAPPING[service].label)}
			</div>
			<div className={styles.port_pair}>
				{(item[`${service}_services`] || []).length }
				{' '}
				{(item[`${service}_services`] || []).length > ONE ? 'Port Pairs' : 'Port Pair'}
			</div>
			<div className={styles.quantity}>
				{`${contentToShow} ${unit}`}
			</div>
			{
				item.source && (
					<div className={styles.quantity}>
						{item.source === 'spot_search' ? 'Spot search - lock freight' : startCase(item.source)}
					</div>
				)
			}

		</div>
	);
}

export default ServiceDetail;
