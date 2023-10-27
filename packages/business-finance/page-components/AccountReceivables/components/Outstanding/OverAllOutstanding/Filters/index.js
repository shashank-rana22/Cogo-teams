import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShowFilterOptions from './ShowFilterOptions';
import styles from './styles.module.css';

function Filters({
	controls = [], filters = {},
	setFilters = () => {},
	clearFilter = () => {},
}) {
	const [show, setShow] = useState(false);

	return (

		<Popover
			visible={show}
			placement="bottom"
			onClickOutside={() => setShow(false)}
			render={(
				<ShowFilterOptions
					controls={controls}
					setFilters={setFilters}
					filters={filters}
					clearFilter={clearFilter}
					setShow={setShow}
				/>

			)}
		>

			<Button
				themeType="secondary"
				size="lg"
				onClick={() => {
					setShow(!show);
				}}
			>

				Filters

				{' '}

				<IcMFilter className={styles.style_filter_button} />

			</Button>

		</Popover>

	);
}

export default Filters;
