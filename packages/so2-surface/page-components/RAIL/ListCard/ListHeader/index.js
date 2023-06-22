import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ListHeader({ item = {} }) {
	const {
		source = '',
		tags = [],
		importer_exporter = {},
		// trade_type = '', inco_term = '',
		is_cogo_assured = '',
	} = item;

	const { tags:importer_exporter_tags = [] } = importer_exporter;

	return (
		<div>
			{is_cogo_assured && (
				<span className={styles.cogoport_assured}>
					<IcCCogoassured />
					<span>Cogo Assured</span>
				</span>
			)}

			<span className={styles.trade_type}>
				DOMESTIC
			</span>

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
