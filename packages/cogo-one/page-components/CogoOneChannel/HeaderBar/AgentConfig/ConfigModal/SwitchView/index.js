import { Select, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

const viewTypeOptions = Object.keys(VIEW_TYPE_GLOBAL_MAPPING || {}).sort().map(
	(itm) => ({
		name  : itm,
		value : itm,
		label : startCase(itm),
	}) || [],
);

function SwitchView({
	viewType = '',
	switchViewType = '',
	setActiveCard = () => {},
	setSwitchViewType = () => {},
	handleClose = () => {},
	setViewType = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.arrow_back}
					onClick={() => {
						setActiveCard('config_modal');
						setSwitchViewType(viewType);
					}}
				/>
				Back
			</div>

			<div className={styles.body_container}>
				<div className={styles.controls_body}>
					<div className={styles.select_label}>
						Switch View Type
					</div>

					<div className={styles.select_container}>
						<Select
							value={switchViewType}
							onChange={setSwitchViewType}
							placeholder="Select Books"
							options={viewTypeOptions}
							size="md"
							style={{ width: '250px' }}
						/>
					</div>
				</div>

				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="tertiary"
						disabled={switchViewType === 'cogoone_admin'}
						onClick={() => {
							setViewType('cogoone_admin');
							handleClose();
						}}
					>
						Reset
					</Button>

					<Button
						size="md"
						themeType="primary"
						disabled={viewType === switchViewType}
						onClick={() => {
							setViewType(switchViewType);
							handleClose();
						}}
					>
						Switch
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SwitchView;
