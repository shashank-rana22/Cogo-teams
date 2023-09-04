import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../common/EmptyState';
import useGetKamExpertiseCurrentConfig from '../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../ExpertiseConfigurations/ConfigurationCard';
import LoadingState from '../ExpertiseConfigurations/LoadingState';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();

	const { t } = useTranslation(['allocation']);

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
					{t('allocation:back_to_configurations')}
				</div>
			</div>
			<div className={styles.button_container}>
				<Button size="md" themeType="secondary">
					{t('allocation:view_details')}
				</Button>
			</div>
			{(isEmpty(list))
				? (
					<div className={styles.empty_state_container}>
						<EmptyState
							height="250px"
							width="400px"
							flexDirection="column"
							emptyText={t('allocation:versions_not_found_empty_state')}
							textSize="20px"
						/>
					</div>
				) : (
					<>
						{ list.map((item) => (
							<ConfigurationCard key={item?.id} {...item} />
						))}
					</>
				)}

		</div>
	);
}

export default ViewAllConfigurations;
