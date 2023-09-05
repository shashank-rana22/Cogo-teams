import { Pill, Button } from '@cogoport/components';
import { IcMLink } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

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
				onClick={() => {}}
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
export default tableColumns;
