import { isEmpty } from '@cogoport/utils';

import NoData from './NoData';
import PieData from './PieData';
import styles from './styles.module.css';

interface Props {
	data?: { status?: string };
	selectedExecution?: number;
}

function ShowMore({ data = {}, selectedExecution = 0 }:Props) {
	const { status = '' } = data;
	if (selectedExecution === 0 && status !== 'COMPLETED') {
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
