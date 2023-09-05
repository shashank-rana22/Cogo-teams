import { Table } from '@cogoport/components';

import DeactivateSageMapping from './DeactivateSageMapping/index';
import styles from './styles.module.css';
import useSageMapping from './useSageMapping';

function SageMapping({ tradePartyDetails = {} }) {
	const {
		data = [],
		loading = false,
		showDeactivate,
		tableColumns,
		setShowDeactivate,
		refetchSageOrgMapping,
	} = useSageMapping({ tradePartyDetails: tradePartyDetails.tradePartyDetails });
	if (!data.length) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Sage Mappings</div>

			<Table columns={tableColumns} data={data} loading={loading} />

			<DeactivateSageMapping
				showDeactivate={showDeactivate}
				setShowDeactivate={setShowDeactivate}
				refetchSageOrgMapping={refetchSageOrgMapping}
			/>
		</div>
	);
}

export default SageMapping;
