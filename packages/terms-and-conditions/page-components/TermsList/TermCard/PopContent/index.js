import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

function PopOverContent({
	onClickUpdateTerms,
	setShowEdit,
}) {
	return (
		<Button onClick={() => { onClickUpdateTerms(); setShowEdit(true); }}>Edit</Button>
	);
}
export default PopOverContent;
