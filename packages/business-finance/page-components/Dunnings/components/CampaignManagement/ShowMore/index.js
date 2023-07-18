import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import NoData from './NoData/index.tsx';
import PieData from './PieData/index.tsx';
import styles from './styles.module.css';

const SINGLE_DECREMENT = 1;

function ShowMore({ data = {}, selectedExecution = 0 }) {
	const { status = '', filters = {} } = data;
	const { cogoEntityId = '', serviceTypes = [] } = filters;
	const entity = Object.values(GLOBAL_CONSTANTS.cogoport_entities)
		.filter(
			(singleEntityData) => singleEntityData.id === cogoEntityId,
		)?.[GLOBAL_CONSTANTS.zeroth_index]?.default_entity_code;

	if (selectedExecution === GLOBAL_CONSTANTS.zeroth_index && status !== 'COMPLETED') {
		return <NoData />;
	}
	if (status === 'COMPLETED') {
		return (
			<div className={styles.dropdown_container_visible}>
				{!isEmpty(data) ? (
					<div className={styles.data_container}>
						<div>
							<div>
								<div className={styles.heading}>Service Type</div>
								<div>
									{!isEmpty(serviceTypes) ? serviceTypes.map((service, index) => (
										<div key={service} className={styles.sub_text}>
											{service?.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]}
											{index !== serviceTypes.length - SINGLE_DECREMENT ? ' , ' : null}
										</div>
									)) : '-'}

								</div>
								<div className={styles.heading}>Cogo Entity</div>
								<div className={styles.sub_text}>
									{entity || '-'}
								</div>
							</div>
						</div>

						<div>
							<div>
								<PieData />
							</div>
						</div>
					</div>
				)
					: <NoData />}
			</div>
		);
	}
	return <div className={styles.dropdown_container_invisible} />;
}

export default ShowMore;
