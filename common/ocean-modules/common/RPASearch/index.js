import { Popover } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Search from './Search';
import styles from './styles.module.css';

function RPASearch({
	children,
	onManualUpload = () => {},
	onUpload = () => {},
	multiple,
	entity_type = 'booking_note',
	entity_name = undefined,
}) {
	const [show, setShow] = useState();
	return (
		<div className={styles.container}>
			<Popover
				placement="top"
				theme="light"
				interactive
				className={styles.popover_container}
				content={(
					<Search
						heading={startCase(entity_type)}
						onManualUpload={() => {
							onManualUpload();
							setShow(false);
						}}
						multiple={multiple}
						entity_type={entity_type}
						onUpload={(data) => {
							onUpload(data);
							setShow(false);
						}}
						entity_name={entity_name}
						show={show}
					/>
				)}
				visible={show}
				onClickOutside={() => setShow(false)}
			>
				<div
					role="button"
					tabIndex={0}
					onClick={() => setShow(true)}
				>
					{children}

				</div>
			</Popover>
		</div>
	);
}

export default RPASearch;
