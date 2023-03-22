import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../CurrentConfigurations/ConfigurationCard';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();

	const {
		listKamExpertiseCurrentConfigs = {},
		ConfigCardLoading,
	} = useGetKamExpertiseCurrentConfig();

	// const draft = listKamExpertiseCurrentConfigs?.list;
	const VERSION_CARDS = listKamExpertiseCurrentConfigs?.list || [];

	const onClickBack = () => {
		router.push('/allocation/kam-expertise/configurations');
	};

	return (
		(!ConfigCardLoading ? (
			<div>

				<div className={styles.back_container} role="presentation" onClick={onClickBack}>
					<div className={styles.icon_container}>
						<IcMArrowBack width={16} height={16} />
					</div>
					<div className={styles.back_text}>
						Back to Configurations
					</div>
				</div>
				{/* <ConfigurationCard {...draft} /> */}

				{VERSION_CARDS.map((item) => (
					<ConfigurationCard {...item} />
				))}
			</div>
		) : (<LoadingState />))

	);
}

export default ViewAllConfigurations;
