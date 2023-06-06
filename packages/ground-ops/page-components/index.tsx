import React, { useState } from 'react';

import Air from './Air';
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
			{!generate
			&& (
				<>
					<Header />
					<div style={{ marginTop: 20 }}>
						<Air
							setGenerate={setGenerate}
							setItem={setItem}
							setViewDoc={setViewDoc}
							edit={edit}
							setEdit={setEdit}
						/>
					</div>
				</>
			)}

			{(generate || viewDoc) && (
				<GenerateMAWB
					viewDoc={viewDoc}
					setViewDoc={setViewDoc}
					item={item}
					edit={edit}
					setEdit={setEdit}
					setItem={setItem}
					setGenerate={setGenerate}
				/>
			)}
		</div>
	);
}

export default GroundOps;
