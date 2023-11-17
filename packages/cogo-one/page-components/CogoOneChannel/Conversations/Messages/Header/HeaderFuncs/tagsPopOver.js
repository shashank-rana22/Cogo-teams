import { Popover } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import PopoverContent from './popoverContent';
import styles from './styles.module.css';

function TagsPopOver({
	prevTags = [],
	updateChat = () => {},
	hasPermissionToEdit = false,
	tagOptions = [],
	loading = false,
	isMobile = false,
}) {
	const [isVisible, setIsVisible] = useState(false);

	const filteredOptions = tagOptions.filter(
		({ value }) => !prevTags?.includes(value),
	);

	if (isEmpty(filteredOptions) || !hasPermissionToEdit) {
		return null;
	}

	return (
		<Popover
			placement={isMobile ? 'bottom-end' : 'bottom'}
			interactive
			render={(
				isVisible && (
					<PopoverContent
						loading={loading}
						filteredOptions={filteredOptions}
						prevTags={prevTags}
						setIsVisible={setIsVisible}
						updateChat={updateChat}
					/>
				)
			)}
			onClickOutside={() => setIsVisible(false)}
			visible={isVisible}
		>
			<div className={styles.flex_container_add}>
				<IcMPlusInCircle onClick={() => setIsVisible((prev) => !prev)} width={18} height={18} />
			</div>
		</Popover>
	);
}

export default TagsPopOver;
