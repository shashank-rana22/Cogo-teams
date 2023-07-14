import { Button, Popover } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const formTypes = [
	{ label: 'Employed', value: 'employed' },
	{ label: 'New', value: 'new' },
	{ label: 'Resigned', value: 'resigned' },
];

function ButtonComponent({
	item = {}, action = '', setShowModal = () => {}, showTypePopover = false,
	setShowTypePopover = () => {}, feedback_id = '',
}) {
	const currentDate = formatDate({
		date       : new Date(),
		formatType : 'dateTime',
		dateFormat : 'dd MM yyyy',
		timeFormat : 'HH:mm aaa',
	});

	const formDeadline = 	formatDate({
		date       : item.form_deadline,
		formatType : 'dateTime',
		dateFormat : 'dd MM yyyy',
		timeFormat : 'HH:mm aaa',
	});

	if (action === 'show') {
		return (
			<Button
				size="md"
				themeType="tertiary"
				onClick={() => setShowModal(true)}
				disabled={!feedback_id && !item.form_id}
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
				disabled={formDeadline < currentDate}
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
