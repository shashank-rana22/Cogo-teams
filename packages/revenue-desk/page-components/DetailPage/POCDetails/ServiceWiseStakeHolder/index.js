import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ServiceWiseStakeHolder({ data, serviceType }) {
	return (
		<div>
			<div className={styles.heading}>
				{startCase(serviceType)}
			</div>

			{(data || []).map((item) => (
				<div key={item?.id} className={styles.container}>
					<div className={styles.text}>
						{startCase(item?.stakeholder_type)}
						{' '}
					</div>
					<div className={styles.text}>
						{startCase(item?.user?.name)}
					</div>
				</div>
			))}
		</div>

	);
}

export default ServiceWiseStakeHolder;
