import { Button, Table } from '@cogoport/components';
import { IcMLink } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

const getHeader = (title, key) => ({
	Header   : title,
	accessor : key,
});

const tableColumns = [
	getHeader('ID', 'serial_id'),
	getHeader('BUSINESS NAME (TRADE NAME)', 'business_name'),
	getHeader('REGISTRATION NUMBER', 'registration_number'),
	getHeader('KYC STATUS', 'kyc_status'),
	getHeader('ACCOUNT TYPE', 'account_type'),
	getHeader('TRADE PARTY TYPE', 'trade_party_type'),
	getHeader('', 'redirection'),
];
const DATA_KEYS = [
	'serial_id',
	'registration_number',
	'business_name',
	'kyc_status',
	'account_type',
	'trade_party_type',
	'redirection',
];

const CRM_MAPPING = {
	'Channel Partner'   : 'PRM',
	'Importer/Exporter' : 'Sales CRM',
	'Service Provider'  : 'Supply CRM',
};

function BasicDetailsList({ trade_party_id }) {
	const [tradePartyNetworks, setTradePartyNetworks] = useState(null);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_parties',
			params : {
				organization_data_required : true,
				filters                    : {
					organization_trade_party_detail_id : trade_party_id,
					status                             : 'active',
				},
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			// console.log("res", res.data);
			setTradePartyNetworks(res.data);
		} catch (err) {
			console.log('error occured');
			console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, trade_party_id]);

	const [listData, setListData] = useState([]);

	const getAccountType = (organization) => {
		if (organization.account_type === 'service_provider') { return 'Service Provider'; }
		if (organization.tags.includes('partner')) return 'Channel Partner';

		return 'Importer/Exporter';
	};

	useEffect(() => {
		const DATA = [];
		tradePartyNetworks?.forEach((item) => {
			const formattedData = {
				serial_id: item.organization.serial_id ? (
					<div className={styles.id}>
						<div className={styles.serial_id}>
							#
							{' '}
							{item.organization.serial_id}
						</div>
					</div>
				) : null,
				business_name: item.organization.business_name ? (
					<div className={styles.business_name}>
						{startCase(item.organization.business_name?.toLowerCase())}

						<div className={styles.label_text}>
							{startCase(item.organization?.trade_name?.toLowerCase())}
						</div>
					</div>
				) : null,
				registration_number: item.organization.registration_number
					? item.organization.registration_number
					: '-',
				kyc_status: item.organization.kyc_status
					? startCase(item.organization.kyc_status)
					: null,
				trade_party_type: item.trade_party_type
					? startCase(item.trade_party_type)
					: null,
				account_type : getAccountType(item.organization),
				redirection  : (
					<Button
						onClick={() => {}}
						className="secondary sm"
					>
						<IcMLink style={{ marginRight: 4 }} />
						Redirect to
						{' '}
						{CRM_MAPPING[getAccountType(item.organization)]}
					</Button>
				),
			};

			const DATA_TO_PUSH = {};

			DATA_KEYS?.forEach((dataKey) => {
				DATA_TO_PUSH[dataKey] = formattedData[dataKey] || item[dataKey] || '-';
			});

			DATA.push(DATA_TO_PUSH);
			setListData(DATA);
		});
	}, [tradePartyNetworks]);

	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Trade Networks</div>

			<Table columns={tableColumns} data={listData} />
		</div>
	);
}

export default BasicDetailsList;
