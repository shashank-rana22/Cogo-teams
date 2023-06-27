import { Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import StyledOptions from './StyledOptions';
import styles from './styles.module.css';

function StyledSelect({ defaultValue, onChange = () => {}, options = [], disabled = false }) {
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
			onClickOutside={() => setShowPopover(false)}
			interactive
		>
			<div
				className={styles.flex}
				role="presentation"
			>
				<div className={styles.styled_text}>{startCase(defaultValue)}</div>

				{!disabled ? (
					<IcMArrowDown
						onClick={() => {
							setShowPopover(!showPopover);
						}}
						style={{ margin: '2px 0px 0px 4px', cursor: 'pointer' }}
					/>
				) : null}
			</div>
		</Popover>
	);
}

export default StyledSelect;
