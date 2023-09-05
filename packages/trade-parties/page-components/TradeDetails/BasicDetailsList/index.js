import { Table, Pill, Button } from '@cogoport/components';
import { IcMLink } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetOrganization from '../../../hooks/useGetOrganization';
import useListOrganizationTradeParties from '../../../hooks/useListOrganizationTradeParties';

import styles from './styles.module.css';

function BasicDetailsList({ trade_party_id = '', trade_partner_id = '' }) {
	const getAccountType = (organization) => {
		if (organization.account_type === 'service_provider') { return 'Service Provider'; }
		if (organization.tags.includes('partner')) return 'Channel Partner';

		return 'Importer/Exporter';
	};
	const CRM_MAPPING = {
		'Channel Partner'   : 'PRM',
		'Importer/Exporter' : 'Sales CRM',
		'Service Provider'  : 'Supply CRM',
	};
	const [organizationId, setOrganizationId] = useState('');
	const val = useGetOrganization({ id: organizationId });
	const handleRedirectToCRM = (organization) => {
		if (organization.account_type === 'service_provider') {
			window.open(`/${trade_partner_id}/details/supply/${organization.id}`, '_blank');
		} else if (organization.tags.includes('partner')) {
			setOrganizationId(organization.id);
			const partner_id = val?.data?.data?.twin_partner?.id;
			// console.log('vall', val, partner_id);
			window.open(`/${trade_partner_id}/prm/${partner_id}`, '_blank');
		} else {
			window.open(`/${trade_partner_id}/details/demand/${organization.id}`, '_blank');
		}
	};

	const tableColumns = [
		{
			Header   : 'ID',
			accessor : (item) => (item.organization.serial_id ? (
				<Pill className={styles.serial_id}>
					#
					{' '}
					{item.organization.serial_id}
				</Pill>
			) : null),
		},
		{
			Header   : 'BUSINESS NAME (TRADE NAME)',
			accessor : (item) => (item.organization.business_name ? (
				<div className={styles.business_name}>
					{startCase(item.organization.business_name?.toLowerCase())}

					<div className={styles.label_text}>
						{startCase(item.organization?.trade_name?.toLowerCase())}
					</div>
				</div>
			) : null),
		},
		{
			Header   : 'REGISTRATION NUMBER',
			accessor : (item) => (item.organization.registration_number
				? item.organization.registration_number
				: '-'),
		},
		{
			Header   : 'KYC STATUS',
			accessor : (item) => (item.organization.kyc_status
				? startCase(item.organization.kyc_status)
				: null),
		},
		{
			Header   : 'ACCOUNT TYPE',
			accessor : (item) => (getAccountType(item.organization)),
		},
		{
			Header   : 'TRADE PARTY TYPE',
			accessor : (item) => (item.trade_party_type
				? startCase(item.trade_party_type)
				: null),
		},
		{
			Header   : ' ',
			accessor : (item) => (
				<Button
					onClick={() => handleRedirectToCRM(item.organization)}
					themeType="secondary"
				>
					<IcMLink style={{ marginRight: 4 }} />
					Redirect to
					{' '}
					{CRM_MAPPING[getAccountType(item.organization)]}
				</Button>
			),
		},

	];

	const { data, loading } = useListOrganizationTradeParties({ trade_party_id });
	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Trade Networks</div>

			<Table columns={tableColumns} data={data} />
		</div>
	);
}

export default BasicDetailsList;
