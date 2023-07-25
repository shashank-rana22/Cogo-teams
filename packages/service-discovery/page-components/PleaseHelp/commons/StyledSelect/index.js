import { Popover, cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import StyledOptions from './StyledOptions';
import styles from './styles.module.css';

const ICON_MAPPING = {
	sm: {
		height : '12px',
		width  : '12px',
	},
	lg: {
		height : '18px',
		width  : '18px',
	},
};

function StyledSelect({ defaultValue = '', onChange = () => {}, options = [], disabled = false, size = 'sm' }) {
	const [showPopover, setShowPopover] = useState(false);

	return (
		<Popover
			visible={showPopover}
			placement="bottom"
			content={(
				<StyledOptions
					setShowPopover={setShowPopover}
					onChange={onChange}
					options={options}
				/>
			)}
			className={styles.popover}
			onClickOutside={() => setShowPopover(false)}
			interactive
		>
			<div
				className={styles.flex}
				role="presentation"
			>
				<div className={cl`${styles.styled_text}
				 ${styles[size]} ${disabled && styles.disabled}`}
				>
					{startCase(defaultValue)}

				</div>

				{!disabled ? (
					<IcMArrowDown
						onClick={() => {
							setShowPopover(!showPopover);
						}}
						style={{ margin: '2px 0px 0px 4px', cursor: 'pointer', ...ICON_MAPPING[size] }}
					/>
				) : null}
			</div>
		</Popover>
	);
}

export default StyledSelect;
