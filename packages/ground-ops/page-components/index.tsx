import React, { useState } from 'react';

import Air from './Air';
import GenerateMAWB from './GenerateMAWB';
import Header from './Header';
import styles from './styles.module.css';

function GroundOps() {
	const [generate, setGenerate] = useState(false);
	const [item, setItem] = useState({});

	return (
		<div className={styles.container}>
			{!generate
			&& (
				<>
					<Header />
					<div style={{ marginTop: 20 }}>
						<Air setGenerate={setGenerate} setItem={setItem} />
					</div>
				</>
			)}
			{generate && <GenerateMAWB item={item} task={item} />}
		</div>
	);
}

export default GroundOps;
