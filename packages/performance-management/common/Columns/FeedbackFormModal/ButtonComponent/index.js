import { Button, Popover } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ButtonComponent({
	action = '', setShowModal = () => {}, showTypePopover = false,
	setShowTypePopover = () => {}, feedback_id = '',
}) {
	const formTypes = [
		{ label: 'Employed', value: 'employed' },
		{ label: 'New', value: 'new' },
		{ label: 'Resigned', value: 'resigned' },
	];

	if (action === 'show') {
		return (
			<Button
				size="md"
				themeType="link"
				onClick={() => setShowModal(true)}
			>
				View Form
			</Button>
		);
	}

	const content = formTypes.map((type) => (
		<div
			className={styles.popover_item}
			key={type.value}
			role="button"
			tabIndex={0}
			onClick={(e) => {
				e.stopPropagation();
				setShowModal(type.value);
				setShowTypePopover(false);
			}}
		>
			{type.label}
		</div>
	));

	return (
		<Popover
			visible={showTypePopover}
			placement="left"
			render={content}
			onClickOutside={() => setShowTypePopover(false)}
			interactive
		>
			<Button
				size="sm"
				themeType="primary"
				onClick={() => 	setShowTypePopover(!showTypePopover)}
			>
				{isEmpty(feedback_id) ? (
					<>
						<IcMPlusInCircle style={{ marginRight: '4px' }} width={16} height={16} />
						ADD
					</>
				) : (
					<>
						<IcMEdit style={{ marginRight: '4px' }} width={16} height={16} />
						EDIT
					</>
				)}

			</Button>
		</Popover>
	);
}

export default ButtonComponent;
