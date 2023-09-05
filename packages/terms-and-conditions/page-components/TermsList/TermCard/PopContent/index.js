import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

function PopOverContent({
	onClickUpdateTerms,
}) {
	return (
		<Button onClick={onClickUpdateTerms}>Edit</Button>
	);
}
export default PopOverContent;
