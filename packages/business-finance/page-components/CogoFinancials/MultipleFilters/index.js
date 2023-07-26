import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import RenderFilters from './RenderFilters';
import styles from './styles.module.css';

function MultipleFilters() {
	return (
		<div>

			<Popover render={<RenderFilters />} placement="bottom" interactive>
				<div className={styles.filter}>
					<IcMFilter color="#fff" height="80%" width="100%" />
				</div>
			</Popover>
		</div>
	);
}

export default MultipleFilters;
