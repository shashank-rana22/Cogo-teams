import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import RenderFilters from './RenderFilters';
import styles from './styles.module.css';

function MultipleFilters({ filter = {}, setFilter = () => {}, entity = '' }) {
	const [visible, setVisible] = useState(false);
	return (
		<div>

			<Popover
				visible={visible}
				render={(
					<RenderFilters
						filter={filter}
						setFilter={setFilter}
						entity={entity}
					/>
				)}
				placement="bottom"
				interactive
				onClickOutside={() => setVisible(false)}
			>
				<div
					className={styles.filter}
					role="presentation"
					onClick={() => setVisible(!visible)}
				>
					<IcMFilter color="#fff" height="80%" width="100%" />
				</div>
			</Popover>
		</div>
	);
}

export default MultipleFilters;