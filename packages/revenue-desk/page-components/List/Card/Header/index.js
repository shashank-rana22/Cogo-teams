import { Pill } from '@cogoport/components';
import { IcCCogoassured, IcMTimer } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import iconMapping from '../../../../helpers/iconMapping';
import incoTermMapping from '../../../../helpers/incoTermMapping';
import serviceLabelMapping from '../../../../helpers/serviceLabelMapping';

import styles from './styles.module.css';

function Header({ data, filters }) {
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
					{data?.trade_type && (
						<Pill size="md" color="#F2F3FA">
							<div style={{ color: '#7278AD' }}>
								{startCase(data?.trade_type) || startCase(incoTermMapping[data?.inco_term])}
							</div>
						</Pill>
					)}
					<Pill size="md" color="#F7FAEF">
						<div style={{ color: '#849E4C' }}>
							{data?.source === 'direct'
								? 'Sell Without Buy'
								: startCase(data.source || '')}
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
