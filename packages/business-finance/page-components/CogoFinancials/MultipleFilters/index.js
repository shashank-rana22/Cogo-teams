import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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
						setFilter={setFilter}
						entity={entity}
						setVisible={setVisible}
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
					{!isEmpty(filter) && (
						<div className={styles.dot_container}>
							<div className={styles.dot} />
						</div>
					)}
				</div>
			</Popover>
		</div>
	);
}

export default MultipleFilters;
