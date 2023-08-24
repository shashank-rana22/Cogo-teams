import { RadioGroup } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

function getOptions() {
	return Object.keys(VIEW_TYPE_GLOBAL_MAPPING).sort().map(
		(itm) => ({
			name  : itm,
			value : itm,
			label : startCase(itm),
		}),
	);
}

function SwitchView({
	viewType = '',
	switchViewType = '',
	setActiveCard = () => {},
	setSwitchViewType = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.arrow_back}
					onClick={() => {
						setActiveCard('');
						setSwitchViewType(viewType);
					}}
				/>
				Back
			</div>

			<div className={styles.body}>
				<RadioGroup
					options={getOptions()}
					onChange={setSwitchViewType}
					value={switchViewType}
				/>
			</div>
		</div>
	);
}

export default SwitchView;
