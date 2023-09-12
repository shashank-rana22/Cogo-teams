import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import DeactivateSageMapping from './DeactivateSageMapping/index';
import styles from './styles.module.css';
import useSageMapping from './useSageMapping';

function SageMapping({ tradePartyDetails = {} }) {
	const {
		data = {},
		loading = false,
		showDeactivate = '',
		tableColumns = [],
		setShowDeactivate = () => { },
		refetch = () => { },
	} = useSageMapping({ tradePartyDetails: tradePartyDetails.tradePartyDetails });

	if (isEmpty(data?.list)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Sage Mappings</div>

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
	);
}

export default SageMapping;
