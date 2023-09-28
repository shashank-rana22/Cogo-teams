import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import BlockUserModal from './BlockUserModal';

function BlockUser({ item = {}, refetch = () => {} }) {
	const [block, setBlock] = useState(false);

	return (
		<>
			{item?.status === 'active' ? (
				<Button className="primary sm" onClick={() => setBlock(true)}>
					Block
				</Button>
			) : (
				<Button className="secondary sm" onClick={() => setBlock(true)}>
					UnBlock
				</Button>
			)}
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
