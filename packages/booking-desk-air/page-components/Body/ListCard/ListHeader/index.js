import { IcCCogoassured } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import INCO_TERM_MAPING from '../../../../constants/inco-term-mapping';

import styles from './styles.module.css';

const TAGS = ['cogoverse', 'post_facto'];

function ListHeader({ item = {} }) {
	const { t } = useTranslation(['airBookingDesk']);

	const {
		source = '',
		tags = [],
		importer_exporter = {},
		trade_type = '',
		inco_term = '',
		is_cogo_assured = '',
		is_job_closed = false,
		is_job_closed_financially = false,
	} = item;

	const { tags:importer_exporter_tags = [] } = importer_exporter;

	const tradeType = trade_type || INCO_TERM_MAPING[inco_term];

	return (
		<div className={styles.header_pills}>
			{is_cogo_assured && (
				<span className={styles.cogoport_assured}>
					<IcCCogoassured />
					<span>{t('airBookingDesk:cogo_assured')}</span>
				</span>
			)}
			{tradeType ? (
				<span className={styles.trade_type}>
					{startCase(tradeType)}
				</span>
			) : null}
			{importer_exporter_tags.includes('partner') && (
				<span className={styles.importer_exporter_tags}>{t('airBookingDesk:channel_partner')}</span>)}
			{is_job_closed && (
				<span className={styles.job_closed}>{t('airBookingDesk:operationally_closed')}</span>
			)}
			{is_job_closed_financially && (
				<span className={styles.financially_closed}>{t('airBookingDesk:financially_closed')}</span>
			)}
			{source && (
				<span className={styles.source}>
					{source === 'direct'
						? t('airBookingDesk:sell_without_buy')
						: startCase(source)}
				</span>
			) }
			{(tags || []).map((tag) => TAGS.includes(tag) && (
				<span
					key={tag}
					className={styles[tag]}
				>
					{startCase(tag)}
				</span>
			))}
		</div>
	);
}
export default ListHeader;
