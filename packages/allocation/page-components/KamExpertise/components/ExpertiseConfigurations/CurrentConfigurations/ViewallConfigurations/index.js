import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetKamExpertiseCurrentConfig from '../../../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../ConfigurationCard';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();

	const { listKamExpertiseCurrentConfigs = {} } = useGetKamExpertiseCurrentConfig();
	const VERSION_CARDS = listKamExpertiseCurrentConfigs?.list || [];

	const onClickBack = () => {
		router.push('/allocation/kam-expertise/configurations');
	};
	return (
		<>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Configurations
				</div>
			</div>

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard {...item} />
			))}
		</>

	);
}

export default ViewAllConfigurations;
