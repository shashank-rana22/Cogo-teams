import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../CurrentConfigurations/ConfigurationCard';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();

	const {
		configCardLoading,
		ALL_VERSIONS,
		DRAFTS,
	} = useGetKamExpertiseCurrentConfig();

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
			{(isEmpty(ALL_VERSIONS) && isEmpty(DRAFTS))
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
						{ DRAFTS.map((item) => (
							<ConfigurationCard {...item} />
						))}

						{ ALL_VERSIONS.map((item) => (
							<ConfigurationCard {...item} />
						))}
					</>
				)}

		</div>
	);
}

export default ViewAllConfigurations;
