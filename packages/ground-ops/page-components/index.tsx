import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Air from './Air';
import GenerateHAWB from './GenerateHAWB';
import GenerateMAWB from './GenerateMAWB';
import Header from './Header';
import styles from './styles.module.css';

function GroundOps() {
	const [generate, setGenerate] = useState(false);
	const [item, setItem] = useState({});
	return (
		<div className={styles.container}>
			<Button onClick={() => setGenerate(!generate)}>HAWB</Button>
			{!generate
			&& (
				<>
					<Header />
					<div style={{ marginTop: 20 }}>
						<Air setGenerate={setGenerate} setItem={setItem} />
					</div>
				</>
			)}
			{generate && item.blCategory === 'hawb'
			&& <GenerateMAWB item={item} task={item} />}
			{generate && item.blCategory === 'mawb'
			&& <GenerateHAWB item={item} task={item} />}
		</div>
	);
}

export default GroundOps;
