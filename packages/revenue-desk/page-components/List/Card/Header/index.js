import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCCogoassured, IcMTimer } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import iconMapping from '../../../../helpers/iconMapping';
import incoTermMapping from '../../../../helpers/incoTermMapping';
import serviceLabelMapping from '../../../../helpers/serviceLabelMapping';

import styles from './styles.module.css';

const getBookingSource = (source = '') => {
	if (source === 'direct') {
		return 'Sell Without Buy';
	}

	if (source === 'spot_line_booking') {
		return 'SpotLine Booking';
	}

	return startCase(source);
};

function Header({ data = {}, filters = {} }) {
	const { discount_reason = {}, source = '' } = data || {};
	const { tags = [], name = '', discount_value = 0 } = discount_reason || {};
	let subscriptionDiscountApplied = '';
	if ((tags || []).includes('partner_subscription')) {
		subscriptionDiscountApplied = name.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index];
	}

	const { importer_exporter:{ tags: orgTags = [] } = {} } = data || {};
	const accountType = (orgTags || []).includes('partner') ? 'Channel Partner' : 'Importer Exporter';

	return (
		<div className={styles.header_container}>
			<div className={styles.left_section}>
				<div className={styles.createdon_text}>
					Created on :
					{' '}
					{format(data?.created_at, 'dd MMM yyyy')}
				</div>
				<div className={styles.service_type}>
					{iconMapping[data?.shipment_type]}
					<div style={{ margin: '0 5px' }}>
						{serviceLabelMapping[data?.shipment_type]}
					</div>
					<Pill size="md" color="#F9F9F9">
						<div style={{ color: '#221F20' }}>
							SID :
							{' '}
							{data?.serial_id}
						</div>
					</Pill>
				</div>
				<div className={styles.pills_container}>
					{(data?.trade_type || data?.inco_term) && (
						<Pill size="md" color="#F2F3FA">
							<div style={{ color: '#7278AD' }}>
								{startCase(data?.trade_type) || startCase(incoTermMapping[data?.inco_term])}
							</div>
						</Pill>
					)}
					<Pill size="md" color={source === 'spot_line_booking' ? '#ee3425' : '#F7FAEF'}>
						<div style={{ color: source === 'spot_line_booking' ? '#fff' : '#849E4C' }}>
							{getBookingSource(source)}
						</div>
					</Pill>
					<Pill size="md" color="#F7FAEF">
						<div style={{ color: '#849E4C' }}>
							{startCase(data.state || '')}
						</div>
					</Pill>
					{(data?.tags || []).map((i) => (
						<Pill key={i}>{startCase(i)}</Pill>
					))}
					{data?.is_cogo_assured ? (
						<Pill
							prefix={<IcCCogoassured />}
							size="md"
							color="#e6fae8"
						>
							Cogoport Assured
						</Pill>

					) : null}
					{data?.is_organic_booking ? (
						<Pill
							size="md"
							color="#e6fae8"
						>
							Organic Booking
						</Pill>
					) : null}
					{data?.is_saas_subscribed ? (
						<Pill size="md" color="#e6fae8">
							Saas Subscribed
						</Pill>
					) : null}
					<Pill size="md" color="#F7FAEF">
						<div style={{ color: '#849E4C' }}>
							{accountType}
						</div>
					</Pill>
					{subscriptionDiscountApplied ? (
						<Pill size="md" color="#e6fae8">
							Subscription (
							{subscriptionDiscountApplied}
							{' '}
							-
							{' '}
							{discount_value}
							%)
						</Pill>
					) : null}
				</div>
			</div>

			{filters?.rd_state === 'active' && (
				<div style={{ color: 'red', display: 'flex', alignItems: 'center', width: '20%', fontWeight: '600' }}>
					<IcMTimer fill="red" width="15" height="15" />
					<div style={{ marginLeft: '3px' }}>
						{format(data?.confirmed_by_importer_exporter_at, 'hh')}
						{' '}
						Hrs :
						{' '}
						{format(data?.confirmed_by_importer_exporter_at, 'mm')}
						{' '}
						mins
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
