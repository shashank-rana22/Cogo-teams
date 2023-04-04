import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import useGetKamExpertiseCurrentConfig from '../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../ExpertiseConfigurations/ConfigurationCard';
import LoadingState from '../ExpertiseConfigurations/LoadingState';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();

	const {
		configCardLoading,
		list = [],
	} = useGetKamExpertiseCurrentConfig({ type: ['draft', 'live', 'expired'] });

	const onClickBack = () => {
		router.push('/allocation/kam-expertise/configurations');
	};

	if (configCardLoading) 	{
		return (<LoadingState />);
	}

	return (
		<div>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Configurations
				</div>
			</div>

			{(isEmpty(list))
				? (
					<div className={styles.empty_state_container}>
						<EmptyState
							height="250px"
							width="400px"
							flexDirection="column"
							emptyText="Versions not Found"
							textSize="20px"
						/>
					</div>
				) : (
					<>
						{ list.map((item) => (
							<ConfigurationCard {...item} />
						))}
					</>
				)}

		</div>
	);
}

export default ViewAllConfigurations;
