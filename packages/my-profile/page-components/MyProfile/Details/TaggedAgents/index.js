import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function TaggedAgent({ detailsData = {} }) {
	const { t } = useTranslation(['profile']);

	const formatArrayValues = (items) => {
		const formattedItem = items?.map((item) => item?.name);
		return formattedItem.join(',  ') || '';
	};
	return (
		<div className={styles.card_container}>
			<div className={styles.header_text}>
				{`${t('profile:tagged_sales_agent_header_text')}${
					(detailsData?.sales_agents || []).length
				}`}
			</div>
			<div className={styles.sub_container}>
				{!isEmpty(detailsData?.sales_agents) ? (
					formatArrayValues(detailsData?.sales_agents)
				) : (
					<div className={styles.empty_text}>{t('profile:tagged_sales_agent_empty_message')}</div>
				)}
			</div>
		</div>
	);
}

export default TaggedAgent;
