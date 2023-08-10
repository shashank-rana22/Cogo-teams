import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ListHeader({ item = {} }) {
	const {
		source = '',
		tags = [],
		importer_exporter = {},
		is_cogo_assured = '',
		rail_domestic_freight_services = [],
	} = item;

	const { tags:importer_exporter_tags = [] } = importer_exporter;

	const mainService = rail_domestic_freight_services.find((service) => service.main_service_id === null);

	return (
		<div>
			{is_cogo_assured && (
				<span className={styles.cogoport_assured}>
					<IcCCogoassured />
					<span>Cogo Assured</span>
				</span>
			)}

			{mainService?.trade_type && (
				<span className={styles.trade_type}>
					{startCase(mainService?.trade_type)}
				</span>
			)}

			{importer_exporter_tags.includes('partner') && (
				<span className={styles.importer_exporter_tags}>Channel Partner</span>)}

			{source && (
				<span className={styles.source}>
					{source === 'direct'
						? 'Sell Without Buy'
						: startCase(source)}
				</span>
			) }
			{tags.includes('cogoverse') && <span className={styles.cogoverse}>Cogoverse</span>}
		</div>
	);
}
export default ListHeader;
