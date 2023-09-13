import { CheckboxGroup } from '@cogoport/components';
import { withControl } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const CheckBoxCom = withControl(CheckboxGroup);

function TransShipmentsFilter({ isOpen = false, handleNav = () => {}, fields = [], control = {} }) {
	return (
		<>
			<div className={styles.header} role="presentation" onClick={() => handleNav('transshipments')}>
				<div className={styles.nav_heading}>
					Transshipments
				</div>
				<div className={styles.column}>
					<IcMArrowRotateRight
						height="8px"
						width="14px"
						className={isOpen.includes('transshipments') ? styles.open : ''}
					/>
				</div>
			</div>
			{isOpen.includes('transshipments') && (
				<div className={styles.check_box_wrapper}>
					<CheckBoxCom {...fields[GLOBAL_CONSTANTS.zeroth_index]} control={control} />
				</div>
			)}
			<div className={styles.line} />
		</>
	);
}

export default TransShipmentsFilter;
