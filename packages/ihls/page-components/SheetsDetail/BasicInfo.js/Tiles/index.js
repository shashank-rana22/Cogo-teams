import { Card, Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const DEFAULT_ZERO = 0;
function Tiles({ data = {}, loading = false }) {
	return (
		<div className={styles.container}>
			<Card
				themetype="primary"
				disabled={false}
				className={styles.tile_container}
			>
				<Card.Title title="Processed Records" className={styles.tile_heading} />
				<Card.Description className={styles.stat_value}>

					{loading ? <Placeholder />
						: (
							<div className={styles.main_title}>
								<div className={styles.green}>
									{data?.processed_records_count || DEFAULT_ZERO}
								</div>
							</div>
						)}
				</Card.Description>
			</Card>

			<Card
				themetype="primary"
				disabled={false}
				className={styles.tile_container}
			>
				<Card.Title title="Unique Leads" className={styles.tile_heading} />
				<Card.Description className={styles.stat_value}>

					{loading ? <Placeholder />
						: (
							<div className={styles.main_title}>
								<div className={styles.blue}>
									{data?.unique_leads_created_count || DEFAULT_ZERO}
								</div>
							</div>
						)}
				</Card.Description>
			</Card>
			<Card
				themetype="primary"
				disabled={false}
				className={styles.tile_container}
			>
				<Card.Title title="Updated Leads" className={styles.tile_heading} />
				<Card.Description className={styles.stat_value}>

					{loading ? <Placeholder />
						: (
							<div className={styles.main_title}>
								<div className={styles.blue}>
									{data?.leads_updated_count || DEFAULT_ZERO}
								</div>
							</div>
						)}
				</Card.Description>
			</Card>
			<Card
				themetype="primary"
				disabled={false}
				className={styles.tile_container}
			>
				<Card.Title title="Shipment Records" className={styles.tile_heading} />
				<Card.Description className={styles.stat_value}>

					{loading ? <Placeholder />
						: (
							<div className={styles.main_title}>
								<div className={styles.green}>
									{data?.shipment_records_created_count || DEFAULT_ZERO}
								</div>
							</div>
						)}
				</Card.Description>
			</Card>
		</div>
	);
}

export default Tiles;
