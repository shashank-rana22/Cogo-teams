import { Input, Checkbox } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

function Promised({ item = {} }) {
	const [editPromised, setEditPromised] = useState(false);
	const [promisedQuantity, setPromisedQuantity] = useState(item.promised);
	const [isHardLimit, setIsHardLimit] = useState(true);

	return !editPromised
		? (
			<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
				{item.promised}
				<IcMEdit onClick={() => setEditPromised(true)} />
			</div>
		) : (
			<>
				<Input
					size="xs"
					placeholder="Extra small"
					value={promisedQuantity}
					onChange={(e) => setPromisedQuantity(e)}
				/>
				<Checkbox
					label="set hard limit"
					value={isHardLimit}
					setIsHardLimit={setIsHardLimit}
					onChange={() => setIsHardLimit((prev) => !prev)}
				/>
			</>
		);
}
export default Promised;
