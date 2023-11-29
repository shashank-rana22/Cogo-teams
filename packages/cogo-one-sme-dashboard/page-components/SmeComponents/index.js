import React, { useMemo } from 'react';

import IntersectionLoader from '../../common/IntersectionLoader';

import getComponentMapping from './getComponentMapping';
import styles from './styles.module.css';

function SmeComponents({ filterParams = {} }) {
	const componentMapping = useMemo(
		() => getComponentMapping({ filterParams }),
		[filterParams],
	);

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
						...rest
					} = componentItem || {};

					if (!Comp) {
						return null;
					}

					if (initialLoad) {
						return (
							<Comp
								{...rest}
								key={key}
								filterParams={filterParams}
							/>
						);
					}

					return (
						<IntersectionLoader
							key={key}
							headerText={headerText}
							hiderAfterLoaded={hiderAfterLoaded}
						>
							<Comp
								{...rest}
								filterParams={filterParams}
							/>
						</IntersectionLoader>
					);
				},
			)}
		</div>
	);
}

export default SmeComponents;
