import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function HsCodeContainer({
	hscodeArr = [],
	handleSubmit,
	getReport,
	setHscodeArr,
}) {
	const { t } = useTranslation(['athenaDashboard']);

	return (
		<div className={styles.selected_hscode_container}>
			{
				!isEmpty(hscodeArr) ? (

					<div className={styles.selected_hscodes}>
						{t('athenaDashboard:selected_hs_codes')}
						<div className={styles.display_selected_code}>
							{
							((hscodeArr || []).map((item) => (
								<div key={item} className={styles.hscode}>
									<div className={styles.hscode_text}>
										{item}
									</div>
								</div>
							)))
						}
						</div>
						<div className={styles.button_group}>
							<Button
								size="md"
								themeType="primary"
								className={styles.build_report_button}
								onClick={handleSubmit(getReport)}
							>
								{t('athenaDashboard:build_report')}
							</Button>

							<Button
								style={{ marginTop: '24px' }}
								themeType="tertiary"
								onClick={() => { setHscodeArr([]); }}
							>
								{t('athenaDashboard:clear_all')}
							</Button>

						</div>
					</div>

				) : (
					<div className={styles.selected_hscode_container_text}>
						{t('athenaDashboard:select_hs_code_phrase')}
					</div>
				)
			}
		</div>
	);
}
export default HsCodeContainer;
