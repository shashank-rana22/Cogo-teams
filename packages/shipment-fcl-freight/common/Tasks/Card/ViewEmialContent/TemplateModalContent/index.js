import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

function TemplateModalContent({ list = [] }) {
	const templateRef = useRef(null);

	useEffect(() => {
		const handleContent = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};

		const currentRef = templateRef.current;

		if (currentRef) {
			currentRef.addEventListener('click', handleContent, true);

			const allAnchorsElement = templateRef.current.querySelectorAll('a[href]');
			[...allAnchorsElement].forEach((element) => {
				const newElement = element;
				newElement.href = '';
				newElement.style.cursor = 'not-allowed';
			});
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener('click', handleContent);
			}
		};
	}, [list?.length]);

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_state_container}>
				Mail is not delivered yet, please try after some time
			</div>
		);
	}

	return (
		<div ref={templateRef}>
			<div
				dangerouslySetInnerHTML={{
					__html: list?.[GLOBAL_CONSTANTS.zeroth_index]?.content?.body,
				}}
			/>
		</div>
	);
}

export default TemplateModalContent;
