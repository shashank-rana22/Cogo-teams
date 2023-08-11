import React, { useEffect } from 'react';

import useGenerateKAMSList from '../../../../../../../../hooks/useGenerateKAMSList';
import styles from '../styles.module.css';

import Body from './Body';

const TIMER = 5000;

function Generate({
	showModal = {},
	refetchListObjectives = () => { },
	loader: contentLoader = true,
	setLoader = () => { },
}) {
	const { loading } = useGenerateKAMSList({
		id     : showModal?.id,
		refetchListObjectives,
		loader : contentLoader,
	});

	useEffect(() => {
		const hideSpinner = setTimeout(() => {
			setLoader(false);
		}, TIMER);

		return () => clearTimeout(hideSpinner);
	}, [setLoader]);

	return (
		<div className={styles.modal_body}>
			<Body loading={loading} contentLoader={contentLoader} />
		</div>
	);
}

export default Generate;
