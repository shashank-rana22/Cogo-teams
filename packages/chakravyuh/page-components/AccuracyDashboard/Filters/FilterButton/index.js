import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterContainer from '../FilterContainer';
import styles from '../styles.module.css';

function FilterButton(props) {
	const [visible, setVisible] = useState(false);
	return (
		<div className={styles.filters_container}>
			<Popover
				render={<FilterContainer {...props} setVisible={setVisible} />}
				placement="bottom-end"
				interactive
				visible={visible}
				onClickOutside={() => setVisible(false)}
			>
				<Button
					themeType="accent"
					onClick={() => setVisible((prev) => !prev)}
					className={styles.filter_btn}
				>
					<IcMFilter className={styles.filter_icon} />
				</Button>
			</Popover>
		</div>
	);
}

export default FilterButton;
