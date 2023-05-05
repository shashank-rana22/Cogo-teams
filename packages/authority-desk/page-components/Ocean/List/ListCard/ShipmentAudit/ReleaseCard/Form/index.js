import React from 'react';
import { Button } from '@cogoport/components';
import useUpdateShipmentBlDoDetails from '../../../../../../../hooks/useUpdateShipmentBlDoDetails';
import styles from './styles.module.css';

function Form({
	setOpen = () => {},
	blData = [],
	tradeType,
	hold = false,
	surrender = false,
	selectedTab,
}) {
	const docOptions = () => {
		if (surrender) {
			const docsToSurrender = blData.filter(
				(item) =>
					[
						'draft_bill_of_lading',
						'bill_of_lading',
						'draft_house_bill_of_lading',
						'house_bill_of_lading',
					].includes(item?.document_type) && item?.status === 'approved',
			);
			return docsToSurrender;
		}

		return blData;
	};

	const modifiedControls = controls(docOptions());

	// const { onUpdate, fields, error, onError, handleSubmit } = useUpdateBlDetails(
	// 	{
	// 		modifiedControls,
	// 		setOpen,
	// 		tradeType,
	// 		hold,
	// 		surrender,
	// 		selectedTab,
	// 	},
	// );

	let heading = 'Approve Document';
	if (hold) {
		heading = 'Hold Document';
	} else if (surrender) {
		heading = 'Approve for Surrender Document';
	} else if (selectedTab === 'approved') {
		heading = 'Approve for Release';
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{div}</div>

			{modifiedControls?.[0]?.options?.length === 0 ? (
				<div style={{ fontWeight: '500', color: 'red', marginBottom: '16px' }}>
					No Document has been uploaded!
				</div>
			) : null}

			{/* <Layout
				themeType="admin"
				fields={fields}
				controls={modifiedControls}
				errors={error}
			/> */}

			<div className={styles.button_wrapper}>
				<Button onClick={handleSubmit(onUpdate, onError)}>{heading}</Button>
			</div>
		</div>
	);
}

export default Form;
