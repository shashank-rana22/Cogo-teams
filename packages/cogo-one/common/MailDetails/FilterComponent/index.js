import { Badge, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import PopoverComponent from './PopoverComponent';
import styles from './styles.module.css';

function FilterComponent() {
	const [showPopover, setShowPopover] = useState(false);

	const { control } = useForm();

	return (
		<Popover
			placement="right"
			visible={showPopover}
			render={(
				<PopoverComponent
					control={control}
				/>
			)}
		>
			<Badge color="orange">
				<IcMFilter
					className={styles.filter_icon}
					onClick={() => setShowPopover((prev) => !prev)}
				/>
			</Badge>
		</Popover>
	);
}

export default FilterComponent;
