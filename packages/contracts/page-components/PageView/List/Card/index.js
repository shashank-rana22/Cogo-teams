import { Button, Popover } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, startCase } from '@cogoport/utils';

import Line from '../../../../common/Line';
import formatPortPair from '../../../../utils/formatPortPair';

import BiddingProof from './BiddingProof';
import PortPair from './PortPair';
import ServiceDetail from './ServiceDetail';
import styles from './styles.module.css';

function Card({ item, filters }) {
	const {
		importer_exporter = {}, requested_by = '', requester_name = '',
		is_bidding_contract = false, contract_proof = '', bidding_proof = [],
	} = item || {};
	const { business_name = '' } = importer_exporter;

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

	const handleDownload = (val) => {
		if (val) {
			window.open(val, '_blank');
		}
	};

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
					{is_bidding_contract && (
						<div className={styles.bidding_contract}>
							Bidding Contract
						</div>
					)}

					<div className={styles.requested_details}>
						Requested By
						{' '}
						{startCase(requested_by)}
						:
						<div className={styles.requester_name}>{requester_name ? startCase(requester_name) : '--'}</div>
					</div>

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
					{filters?.status === 'active' ? (
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
			<div className={styles.proof_sheet}>
				<div className={styles.business_name}>
					Business Name:
					<div className={styles.org_name}>{business_name ? startCase(business_name) : '-'}</div>
				</div>
				<div className={styles.proofs}>
					<Button size="md" themeType="linkUi" onClick={() => handleDownload(contract_proof)}>
						Contract Proof
					</Button>
					{is_bidding_contract && (
						<Popover
							content={(
								<BiddingProof bidding_proof={bidding_proof} handleDownload={handleDownload} />
							)}
							placement="bottom"
						>
							<Button size="md" themeType="link">
								Bidding Proof
							</Button>
						</Popover>
					)}
				</div>
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
