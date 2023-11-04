import React from 'react';

import IntersectionLoader from '../../common/IntersectionLoader';

import getComponentMapping from './getComponentMapping';
import styles from './styles.module.css';

function SmeComponents() {
	const componentMapping = getComponentMapping();

	return (
		<div className={styles.container}>
			{componentMapping?.map(
				(componentItem) => {
					const {
						key = '',
						Comp = null,
						initialLoad = false,
						headerText = '',
						hiderAfterLoaded = false,
					} = componentItem || {};

					if (!Comp) {
						return null;
					}

					if (initialLoad) {
						return <Comp key={key} />;
					}

					return (
						<IntersectionLoader
							key={key}
							headerText={headerText}
							hiderAfterLoaded={hiderAfterLoaded}
						>
							<Comp />
						</IntersectionLoader>
					);
				},
			)}
		</div>
	);
}

export default SmeComponents;
