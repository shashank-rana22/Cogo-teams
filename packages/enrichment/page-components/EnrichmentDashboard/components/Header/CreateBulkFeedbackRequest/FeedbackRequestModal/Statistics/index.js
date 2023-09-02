import { Pill, Placeholder } from '@cogoport/components';

import getManagerViewStats from '../../../../../configurations/get-manager-view-stats';

import styles from './styles.module.css';

function Statistics(props) {
	const {
		loadingCheckEligibility = false,
		enrichmentData = {},
	} = props;

	const data = getManagerViewStats({ enrichmentData });

	if (loadingCheckEligibility) {
		return <Placeholder height="56px" />;
	}

	return (
		<div className={styles.statistics_container}>
			{(data || []).map((item) => (
				<Pill
					key={item.label}
					prefix={item.prefixIcon}
					size="md"
					color={item.color}
				>
					{item.label}
					:
					{' '}
					<span className={styles.value}>{item.value}</span>
				</Pill>
			))}
		</div>
	);
}

export default Statistics;
