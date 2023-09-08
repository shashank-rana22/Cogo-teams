import { Pill, Button } from '@cogoport/components';
import { IcMLink } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const CRM_MAPPING = {
	'Channel Partner'   : 'PRM',
	'Importer/Exporter' : 'Sales CRM',
	'Service Provider'  : 'Supply CRM',
};

const getAccountType = ({ organization = {} }) => {
	if (organization?.account_type === 'service_provider') { return 'Service Provider'; }
	if (organization?.tags?.includes('partner')) return 'Channel Partner';

	return 'Importer/Exporter';
};
const handleRedirectToCRM = ({ organization = {}, trade_partner_id = '', getOrgData = () => { } }) => {
	if (organization.account_type === 'service_provider') {
		window.open(`/${trade_partner_id}/details/supply/${organization.id}`, '_blank');
	} else if (organization.tags.includes('partner')) {
		getOrgData({ id: organization?.id });
	} else {
		window.open(`/${trade_partner_id}/details/demand/${organization.id}`, '_blank');
	}
};
const getTableColumns = ({
	trade_partner_id = '',
	getOrgData = () => { }, orgLoading = false,
}) => {
	const tableColumns = [
		{
			Header   : 'ID',
			accessor : (item) => (item?.organization?.serial_id ? (
				<Pill className={styles.serial_id}>
					#
					{' '}
					{item?.organization?.serial_id}
				</Pill>
			) : null),
		},
		{
			Header   : 'BUSINESS NAME (TRADE NAME)',
			accessor : (item) => (item?.organization?.business_name ? (
				<div className={styles.business_name}>
					{startCase(item?.organization?.business_name?.toLowerCase())}

					<div className={styles.label_text}>
						{startCase(item?.organization?.trade_name?.toLowerCase())}
					</div>
				</div>
			) : null),
		},
		{
			Header   : 'REGISTRATION NUMBER',
			accessor : (item) => item?.organization?.registration_number,
		},
		{
			Header   : 'KYC STATUS',
			accessor : (item) => (item?.organization?.kyc_status
				? startCase(item.organization.kyc_status)
				: null),
		},
		{
			Header   : 'ACCOUNT TYPE',
			accessor : (item) => (getAccountType({ organization: item?.organization })),
		},
		{
			Header   : 'TRADE PARTY TYPE',
			accessor : (item) => (item?.trade_party_type
				? startCase(item?.trade_party_type)
				: null),
		},
		{
			Header   : ' ',
			accessor : (item) => (
				<Button
					onClick={() => handleRedirectToCRM({
						organization: item?.organization,
						getOrgData,
						trade_partner_id,
					})}
					themeType="secondary"
					disabled={orgLoading}
				>
					<IcMLink style={{ marginRight: 4 }} />
					Redirect to
					{' '}
					{CRM_MAPPING[getAccountType({ organization: item?.organization })]}
				</Button>
			),
		},

	];

	return tableColumns;
};

export default getTableColumns;
