import { Toggle } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const {
		params = {},
		setParams = () => { },
	} = props;

	const handleToggle = () => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				status: (pv?.filters?.status || []).includes('active') ? ['inactive'] : ['active', 'live'],
			},
		}));
	};

	return (
		<section className={styles.container}>
			<Toggle
				className={styles.toggle}
				size="md"
				name="active_status"
				onLabel={t('allocation:active_status_on_label')}
				offLabel={t('allocation:active_status_off_label')}
				value={params?.filters?.status || ['active', 'live']}
				onChange={() => handleToggle()}
			/>
		</section>
	);
}

export default Header;
