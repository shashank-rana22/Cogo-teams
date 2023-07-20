import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import styles from './styles.module.css';

function TemplateModalContent({ list = [] }) {
	const templateRef = useRef(undefined);

	useEffect(() => {
		const handleContent = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};

		if (templateRef.current) {
			const currentTemplateRef = templateRef.current;
			currentTemplateRef.addEventListener('click', handleContent, true);

			const allAnchorsElement = currentTemplateRef.querySelectorAll('a[href]');
			[...allAnchorsElement].forEach((element) => {
				const newElement = element;
				newElement.href = '';
				newElement.style.cursor = 'not-allowed';
			});

			return () => {
				if (currentTemplateRef) {
					currentTemplateRef.removeEventListener('click', handleContent);
				}
			};
		}

		return undefined;
	}, [list?.length]);

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_state}>
				Mail is not delivered yet, please try after some time
			</div>
		);
	}

	return (
		<div className={styles.template} ref={templateRef}>
			<div
				className={styles.flexbox}
				dangerouslySetInnerHTML={{
					__html: list?.[GLOBAL_CONSTANTS.zeroth_index]?.content?.body,
				}}
			/>
		</div>
	);
}

export default TemplateModalContent;
