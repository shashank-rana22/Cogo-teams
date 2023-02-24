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
	const [viewDoc, setViewDoc] = useState(false);
	const [edit, setEdit] = useState(false);

	return (
		<div className={styles.container}>
			<Button onClick={() => setGenerate(!generate)}>HAWB</Button>
			{!generate
			&& (
				<>
					<Header />
					<div style={{ marginTop: 20 }}>
						<Air setGenerate={setGenerate} setItem={setItem} setViewDoc={setViewDoc} setEdit={setEdit} />
					</div>
				</>
			)}
			{(generate || viewDoc) && item.blCategory === 'mawb'
			&& (
				<GenerateMAWB
					viewDoc={viewDoc}
					setViewDoc={setViewDoc}
					item={item}
					edit={edit}
					setEdit={setEdit}
				/>
			)}
			{(generate || viewDoc) && item.blCategory === 'hawb'
			&& (
				<GenerateHAWB
					viewDoc={viewDoc}
					setViewDoc={setViewDoc}
					item={item}
					edit={edit}
					setEdit={setEdit}
				/>
			)}
		</div>
	);
}

export default GroundOps;
