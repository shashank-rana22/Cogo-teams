import { useTranslation } from 'next-i18next';
import React from 'react';

// import MyResponsiveLine from './LineChart';
import styles from './styles.module.css';

function WelcomeText() {
	const { t } = useTranslation(['welcome']);

	return (
		<div className={styles.container}>
			<div className={styles.text_container}>

				<div className={styles.text}>
					{t('welcome:welcome_text_phrase_1')}
				</div>

				<div className={styles.text}>
					{t('welcome:welcome_text_phrase_2')}
					<strong>
						<i>
							{' '}
							‘
							{t('welcome:welcome_text_phrase_3')}
							’.
						</i>
					</strong>
					{' '}
					{t('welcome:welcome_text_phrase_4')}
				</div>

				<div className={styles.text}>
					{t('welcome:welcome_text_phrase_5')}
				</div>

				<div className={styles.text}>
					{t('welcome:welcome_text_phrase_6')}
				</div>
				<div className={styles.regards}>
					<span>{t('welcome:best_regards')}</span>
					<span>{t('welcome:message_author')}</span>
				</div>
			</div>

			{/* <div className={styles.chart_container}>
				<div className={styles.chart_heading}>
					<strong>{name.split(' ')[0] }</strong>
					, here’s how you engaged
				</div>
				<MyResponsiveLine />
			</div> */}

		</div>
	);
}

export default WelcomeText;
