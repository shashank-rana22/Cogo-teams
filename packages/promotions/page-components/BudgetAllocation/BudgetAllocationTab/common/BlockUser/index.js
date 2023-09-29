import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import BlockUserModal from './BlockUserModal';

function BlockUser({ item = {}, refetch = () => {} }) {
	const [block, setBlock] = useState(false);

	return (
		<>
			<Button onClick={() => setBlock(true)}>
				{item?.status === 'active' ? 'Block' : 'UnBlock'}
			</Button>
			{block
				? (
					<BlockUserModal
						refetch={refetch}
						item={item}
						setBlock={setBlock}
					/>
				)
				: null}
		</>
	);
}

export default BlockUser;
