import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

function PopOverContent({
	onClickUpdateTerms,
	setVisible,
}) {
	return (
		<Button onClick={() => { onClickUpdateTerms(); setVisible(false); }}>Edit</Button>
	);
}
export default PopOverContent;
