import { Table } from '@cogoport/components';

import useGetOrganization from '../../../hooks/useGetOrganization';
import useListOrganizationTradeParties from '../../../hooks/useListOrganizationTradeParties';

import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

function BasicDetailsList({ trade_party_id = '', trade_partner_id = '' }) {
	const handlePrmRedirect = ({ data = {} }) => {
		const partner_id = data?.data?.data?.twin_partner?.id;
		const newHref = `${window.location.origin}/${trade_partner_id}/prm/${partner_id}`;
		window.open(newHref);
	};

	const {
		loading: orgLoading = false, apiTrigger: getOrgData = () => { },
	} = useGetOrganization({ refetch: handlePrmRedirect, initialCall: false });

	const tableColumns = getTableColumns({
		trade_partner_id,
		getOrgData,
		orgLoading,
	});

	const { data = {}, loading = false } = useListOrganizationTradeParties({
		defaultParams  : { organization_data_required: true },
		defaultFilters : {
			organization_trade_party_detail_id : trade_party_id,
			status                             : 'active',
		},
	});
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Trade Networks</div>
			<Table
				columns={tableColumns}
				data={data?.list || []}
				loading={loading}
				className={styles.table}
			/>
		</div>
	);
}

export default BasicDetailsList;
