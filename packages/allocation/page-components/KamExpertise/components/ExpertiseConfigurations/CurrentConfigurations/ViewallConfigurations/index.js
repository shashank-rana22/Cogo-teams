import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetKamExpertiseCurrentConfig from '../../../../hooks/useGetKamExpertiseCurrentConfig';
import ConfigurationCard from '../ConfigurationCard';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();
	const VERSION_CARDS = [
		{
			version_number : 4,
			last_edit_by   : 'CogoParth',
			last_modified  : new Date(),
			status_value   : 'draft',
			list           : [{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			}],
		},
		{
			version_number : 3,
			last_edit_by   : 'CogoParth',
			last_modified  : new Date(),
			status_value   : 'live',
			list           : [{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			},
			{
				expertise_type      : 'customer_expertise',
				items               : 9,
				min_score_value     : 800,
				high_priority_count : 20,
			}],
		},

	];

	const { listKamExpertiseCurrentConfigs = {} } = useGetKamExpertiseCurrentConfig();

	console.log('list ', listKamExpertiseCurrentConfigs);

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
