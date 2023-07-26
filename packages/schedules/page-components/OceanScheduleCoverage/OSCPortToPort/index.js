import { Button, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';

import EmptyState from '../../common/EmptyState';
import useGetSailingSchedulePortPairCoverage from '../hooks/useGetSailingSchedulePortPairCoverage';
import ViewScheduleModal from '../ViewScheduleModal';

import styles from './styles.module.css';

function OSCPortToPort({
	originPort,
	destinationPort,
	setIsPortToPort,
	columnsForPattern,
	columnsForPortToPort,
	show,
	setShow,
	portPairData,
}) {
	const { data, loading } = useGetSailingSchedulePortPairCoverage({
		originPort,
		destinationPort,
	});

	return (
		<>
			<ViewScheduleModal
				show={show}
				setShow={setShow}
				columnsForPattern={columnsForPattern}
			/>
			<div className={styles.top_bar}>
				<Button
					themeType="secondary"
					onClick={() => setIsPortToPort(false)}
				>
					<IcMArrowBack />
				</Button>
				<div className={styles.port_pair}>
					{portPairData[GLOBAL_CONSTANTS.zeroth_index]?.origin_port?.name}
					<div
						style={{
							display   : 'flex',
							padding   : '0 16px',
							alignItem : 'center',
						}}
					>
						<IcMArrowNext />
					</div>
					{portPairData[GLOBAL_CONSTANTS.zeroth_index]?.destination_port?.name}
				</div>
			</div>

			<div style={{ padding: '8px' }} />

			{(data || []).length || loading ? (
				<Table
					columns={columnsForPortToPort}
					data={data || []}
					className={styles.table}
					loading={loading}
					loadingRowsCount={10}
				/>
			) : (
				<EmptyState height={300} />
			)}
		</>
	);
}
export default OSCPortToPort;
