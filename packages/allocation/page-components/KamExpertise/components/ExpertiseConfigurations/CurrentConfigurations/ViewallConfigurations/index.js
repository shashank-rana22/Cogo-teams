import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import ConfigurationCard from '../ConfigurationCard';
import Header from '../Header';

import styles from './styles.module.css';

function ViewAllConfigurations() {
	const router = useRouter();
	const VERSION_CARDS = [
		{
			version       : 4,
			last_edit_by  : 'CogoParth',
			last_modified : new Date(),
			status        : 'draft',
		},
		{
			version       : 3,
			last_edit_by  : 'CogoParth',
			last_modified : new Date(),
			status        : 'live',
		},
		{
			version       : 2,
			last_edit_by  : 'CogoParth',
			last_modified : new Date(),
			status        : 'expired',
		},
	];
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
			<Header />

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard {...item} />
			))}
		</>

	);
}

export default ViewAllConfigurations;
