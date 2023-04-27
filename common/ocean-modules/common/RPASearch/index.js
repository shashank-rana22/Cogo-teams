import { Popover } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import Search from './index';

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
		<Popover
			placement="bottom"
			theme="light"
			interactive
			content={(
				// <Search
				// 	heading={startCase(entity_type)}
				// 	onManualUpload={() => {
				// 		onManualUpload();
				// 		setShow(false);
				// 	}}
				// 	multiple={multiple}
				// 	entity_type={entity_type}
				// 	onUpload={(data) => {
				// 		onUpload(data);
				// 		setShow(false);
				// 	}}
				// 	entity_name={entity_name}
				// 	show={show}
				// />
				<div>hello</div>
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
	);
}

export default RPASearch;
