import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';

import DeactivateSageMapping from './DeactivateSageMapping/index';
import styles from './styles.module.css';
import useSageMapping from './useSageMapping';

function SageMapping({ tradePartyDetails = {} }) {
	const {
		data = {},
		loading = false,
		showDeactivate = '',
		tableColumns = [],
		setShowDeactivate = () => {},
		refetch = () => {},
	} = useSageMapping({ tradePartyDetails: tradePartyDetails.tradePartyDetails });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Sage Mappings</div>

			{isEmpty(data?.list) ? <EmptyState /> : (
				<div>
					<Table
						columns={tableColumns}
						data={(data?.list || [])}
						loading={loading}
						className={styles.table}
					/>

					<DeactivateSageMapping
						showDeactivate={showDeactivate}
						setShowDeactivate={setShowDeactivate}
						refetch={refetch}
					/>
				</div>
			)}

		</div>
	);
}

export default SageMapping;
