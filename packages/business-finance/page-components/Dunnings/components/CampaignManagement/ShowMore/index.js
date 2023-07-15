import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import NoData from './NoData/index.tsx';
import PieData from './PieData/index.tsx';
import styles from './styles.module.css';

function ShowMore({ data = {}, selectedExecution = 0 }) {
	const { status = '' } = data;
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
								<div>----</div>
								<div className={styles.heading}>Cogo Entity</div>
								<div>----</div>
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
