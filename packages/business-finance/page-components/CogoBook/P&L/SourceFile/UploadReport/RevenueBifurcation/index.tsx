import { useState } from 'react';

import { getColumn } from '../contant';

import styles from './styles.module.css';

function RevenueBifurcation() {
	const [dropDownData, setDropDownData] = useState({});
	const handleDropdown = (key = '') => {
		setDropDownData((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
	};

	return (
		<div>
			{ getColumn.map((item) => {
				const { label = '', id = '', iconInfo, iconArrowUp, iconArrowDown } = item || {};
				return (
					<div className={styles.card}>
						<div
							className={dropDownData[id] ? styles.card_data_enter : styles.card_data}
							onClick={() => { handleDropdown(id); }}
							role="presentation"
						>
							<div className={styles.flex_header}>
								<div>{label}</div>
								<div className={styles.icon_info}>{iconInfo}</div>
							</div>
							<div>{dropDownData[id] ? iconArrowUp : iconArrowDown}</div>
						</div>
						{ dropDownData[id] && id === '1' && <div>ljnjlln</div>}

					</div>
				);
			})}
		</div>
	);
}
export default RevenueBifurcation;
