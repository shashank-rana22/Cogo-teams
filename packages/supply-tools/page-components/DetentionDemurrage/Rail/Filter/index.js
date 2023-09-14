import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Filters from '../../common/Filters';

import controls from './controls';
import styles from './styles.module.css';

function Filter({ filters = {}, setFilters = () => {} }) {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			<Button themeType="secondary" onClick={() => setShow(true)}>
				<IcMFilter />
				{' '}
				FILTERS
			</Button>
			{show ? (
				<div className={styles.popver}>
					<Popover
						visible={show}
						render={(
							<Filters
								controls={controls}
								filters={filters}
								setFilters={setFilters}
								setShow={setShow}
							/>
						)}
						placement="bottom"
						onClickOutside={() => setShow(false)}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Filter;
