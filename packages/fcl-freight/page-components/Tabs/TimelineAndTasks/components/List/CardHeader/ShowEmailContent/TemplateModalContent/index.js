import React, { useRef, useEffect } from 'react';
import styles from './styles.module.css'

const TemplateModalContent = ({ list = [] }) => {
	const templateRef = useRef(null);

	useEffect(() => {
		const handleContent = (event) => {
			event.preventDefault();
			event.stopPropagation();
		};

		if (templateRef.current) {
			templateRef.current.addEventListener('click', handleContent, true);

			const allAnchorsElement = templateRef.current.querySelectorAll('a[href]');
			[...allAnchorsElement].forEach((element) => {
				const newElement = element;
				newElement.href = '';
				newElement.style.cursor = 'not-allowed';
			});
		}

		return () => {
			if (templateRef.current) {
				templateRef.current.removeEventListener('click', handleContent);
			}
		};
	}, [list?.length]);

	if (list?.length === 0) {
		return (
			<div className={stlyes.empty_state}>
				Mail is not delivered yet, please try after some time
			</div>
		);
	}

	return (
		<div className={styles.template} ref={templateRef}>
			<div className={styles.flexbox}
				dangerouslySetInnerHTML={{
					__html: list?.[0]?.content?.body,
				}}
			/>
		</div>
	);
};

export default TemplateModalContent;
