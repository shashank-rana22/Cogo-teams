import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import INCO_TERM_MAPING from '../../../../constants/inco-term-mapping';

import styles from './styles.module.css';

const TAGS = ['cogoverse', 'post_facto'];
function ListHeader({ item = {} }) {
	const {
		source = '',
		tags = [],
		importer_exporter = {},
		trade_type = '', inco_term = '',
		is_cogo_assured = '',
	} = item;

	const { tags:importer_exporter_tags = [] } = importer_exporter;

	const tradeType = trade_type || INCO_TERM_MAPING[inco_term];

	return (
		<div className={styles.header_pills}>
			{is_cogo_assured && (
				<span className={styles.cogoport_assured}>
					<IcCCogoassured />
					<span>Cogo Assured</span>
				</span>
			)}
			{tradeType ? (
				<span className={styles.trade_type}>
					{startCase(tradeType)}
				</span>
			) : null}
			{importer_exporter_tags.includes('partner') && (
				<span className={styles.importer_exporter_tags}>Channel Partner</span>)}
			{source && (
				<span className={styles.source}>
					{source === 'direct'
						? 'Sell Without Buy'
						: startCase(source)}
				</span>
			) }
			{tags.map((tag) => TAGS.includes(tag) && <span key={tag} className={styles[tag]}>{startCase(tag)}</span>)}
		</div>
	);
}
export default ListHeader;
