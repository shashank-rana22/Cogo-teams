import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function HsCodeContainer({ hscodeArr, handleSubmit, getReport, setHscodeArr }) {
	return (
		<div className={styles.selected_hscode_container}>
			{
				!isEmpty(hscodeArr) ? (

					<div className={styles.selected_hscodes}>
						Selected HS Codes
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
								Build Report
							</Button>

							<Button
								style={{ marginTop: '24px' }}
								themeType="tertiary"
								onClick={() => { setHscodeArr([]); }}
							>
								Clear all
							</Button>

						</div>
					</div>

				) : (
					<div className={styles.selected_hscode_container_text}>
						Select HS Codes for your report below. Your selected codes will show up here.
					</div>
				)
			}
		</div>
	);
}
export default HsCodeContainer;
