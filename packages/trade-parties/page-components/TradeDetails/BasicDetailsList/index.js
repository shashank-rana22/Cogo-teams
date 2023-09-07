import { Table } from '@cogoport/components';

import useGetOrganization from '../../../hooks/useGetOrganization';
import useListOrganizationTradeParties from '../../../hooks/useListOrganizationTradeParties';

import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

function BasicDetailsList({ trade_party_id = '', trade_partner_id = '' }) {
	const handlePrmRedirect = (data) => {
		const partner_id = data?.data?.twin_partner?.id;
		window.open(`/${trade_partner_id}/prm/${partner_id}`, '_blank');
	};

	const {
		loading:orgLoading, apiTrigger:orgTrigger = () => {
		},
	} = useGetOrganization({ refetch: handlePrmRedirect, initialCall: false });

	const tableColumns = getTableColumns({
		trade_partner_id,
		orgTrigger,
		orgLoading,
	});

	const { data, loading } = useListOrganizationTradeParties({ trade_party_id });
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Trade Networks</div>

			<Table columns={tableColumns} data={data} loading={loading} className={styles.table} />
		</div>
	);
}

export default BasicDetailsList;
