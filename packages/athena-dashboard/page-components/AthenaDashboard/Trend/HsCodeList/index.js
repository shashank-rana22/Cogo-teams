import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function HsCodeList({ responsevalue, addCheckedHSCodes }) {
	return (
		<div className={styles.codes}>
			{
					((responsevalue || []).map((item) => (
						<div key={item.hs_code}>
							<div className={styles.result_container}>
								<div className={styles.checkbox}>
									<Checkbox
										key={item.hs_code}
										id={item.hs_code}
										label={item.hs_code}
										value={item.hs_code}
										onChange={(e) => addCheckedHSCodes(e)}
									/>
								</div>
								<div className={styles.description}>
									{item.category}
								</div>
							</div>
							<hr />
						</div>
					)))
				}
		</div>
	);
}
export default HsCodeList;
