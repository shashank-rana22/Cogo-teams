import { Button, Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';

import Line from '../../../../common/Line';
import formatPortPair from '../../../../utils/formatPortPair';

import PortPair from './PortPair';
import ServiceDetail from './ServiceDetail';
import styles from './styles.module.css';

function Card({ item, filters }) {
	const { importer_exporter = {}, requested_by = '', requester_name = '' } = item || {};

	const router = useRouter();
	const formattedData = formatPortPair({ item });
	const newFormattedData = [];
	if (formattedData?.length) {
		(formattedData || []).forEach((pair, i) => {
			if (i <= 1 && Object.keys(pair || {})) {
				newFormattedData.push(pair);
			}
		});
	}

	const services = {};
	item.services.forEach((service) => {
		services[`${service}_services`] = (item[`${service}_services`] || []).length;
	});

	const requestedDetails = ({ type = '' }) => (
		<div className={type ? styles.requested_details : ''}>
			Requested By
			{' '}
			{startCase(requested_by)}
			{' '}
			:
			Requester Name
			{' '}
			{startCase(requester_name)}
		</div>
	);

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.heading}>
					{item?.contract_reference_id ? (
						<>
							Contract ID #
							{item?.contract_reference_id}
						</>
					) : null}
					<div className={styles.content}>
						<div className={styles.name}>
							{startCase(item?.contract_name)}
						</div>
					</div>
				</div>

				<div className={styles.details}>
					<Tooltip
						content={requestedDetails({ type: '' })}
						placement="bottom"
					>
						{requestedDetails({ type: 'fixed_width' })}
					</Tooltip>

					<div className={styles.pair}>
						<div>
							{filters?.status === 'active' ? 'Updated Date' : 'Requested Date '}
							:
						</div>
						<div className={styles.value}>
							{format(
								filters?.status === 'active'
									? item?.approved_at
									: item?.requested_at,
								'dd MMM YYYY',
							)}
						</div>
					</div>
					{ filters?.status === 'active' ? (
						<div className={styles.pair}>
							<div>Validity :</div>
							<div className={styles.value}>
								{item?.validity_left_days || '24'}
								days
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className={styles.business_name}>
				Business Name :
				{' '}
				{startCase(importer_exporter?.business_name)}
			</div>
			<div className={styles.service_details}>
				{item.services.map((service, index) => (
					<>
						<ServiceDetail
							item={item}
							service={service}
							formattedData={formattedData}
						/>
						{index < item.services.length - 1 ? <Line /> : null}
					</>
				))}
			</div>
			<div className={styles.body}>
				<div className={styles.sub_container}>
					<div className={styles.port_pair}>
						{(newFormattedData || []).map((portPair) => (
							<PortPair portPair={portPair} />
						))}
					</div>
					{formattedData?.length > 2 ? (
						<div className={styles.extra}>
							<div>
								+
								{Number(formattedData?.length) - 2}
							</div>
							<div>more</div>
						</div>
					) : null}
				</div>
				<div className={styles.last}>
					<Button
						style={{ marginBottom: '10px' }}
						size="md"
						onClick={() => {
							router.push(
								`/contracts/details?id=${item?.id}`,
							);
						}}
						themeType="secondary"
					>
						View
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Card;
