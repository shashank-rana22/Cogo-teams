import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getStepperConstant = ({ t }) => [
	{ title: t('saasSubscription:arrow_stepper_title_1'), key: 'platform_user' },
	{ title: t('saasSubscription:arrow_stepper_title_2'), key: 'potential_user' },
	{ title: t('saasSubscription:arrow_stepper_title_3'), key: 'active_user' },
	{ title: t('saasSubscription:arrow_stepper_title_4'), key: 'plan_expired_user' },
];

function ArrowStepper({
	stepperData = {},
	setGlobalFilters,
	globalFilters = {},
}) {
	const { customer_segment } = globalFilters || {};
	const { t } = useTranslation(['saasSubscription']);

	const ARROW_STEPPER = getStepperConstant({ t });

	return (
		<div className={styles.stepper_container}>
			{ARROW_STEPPER.map((item) => (
				<div
					key={item.key}
					className={cl`${styles.container} ${customer_segment === item.key ? styles.active : ''}`}
					onClick={() => setGlobalFilters((prev) => ({
						...prev,
						page             : 1,
						customer_segment : item.key,
					}))}
					role="presentation"
				>
					<div className={styles.stepper_arrow}>
						<div className={styles.content_container}>
							<h3 className={styles.content}>{item.title}</h3>
							<p className={cl`${styles.content} ${styles.content_count}`}>
								{t('saasSubscription:arrow_stepper_count')}
							</p>
							<h3 className={styles.content}>{stepperData?.[item.key]}</h3>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ArrowStepper;
