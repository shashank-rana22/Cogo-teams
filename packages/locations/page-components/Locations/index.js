import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Details from '../../components/Details';
import PageNew from '../../components/PageNew';
import getConfigs from '../../utils/get-config';

import CreateUpdateForm from './CreateUpdate';
import styles from './styles.module.css';

function Locations() {
	const [activeCard, setActiveCard] = useState(null);
	const [viewToShow, setViewToShow] = useState('empty');

	const globalActions = () => (
		<Button
			onClick={() => setViewToShow('create')}
			className="small uppercase"

		>
			Create New
		</Button>
	);
	const getViews = ({ refetch }) => ({
		create: {
			content: (
				<CreateUpdateForm
					item={{}}
					onCancel={() => setViewToShow('details')}
					refetch={refetch}
				/>
			),
			heading: 'Create Location',
		},

	});

	const formatParams = (filters) => ({
		filters,
		otherParams: { includes: { aliases: null, main_ports: null } },
	});
	const config = getConfigs({
		getViews,
		globalActions,
	});

	const renderCard = () => {
		if (viewToShow === 'create') {
			return (
				<div className={styles.container}>
					<CreateUpdateForm />
				</div>
			);
		}

		if (viewToShow === 'details') {
			return (
				<div className={styles.container}>
					<h2>Details</h2>
					<Details
						activeCard={activeCard}
						setViewToShow={setViewToShow}
						setActiveCard={setActiveCard}
					/>
				</div>
			);
		}

		return null;
	};

	return (
		<div className={styles.main}>
			<div
				className={viewToShow === 'empty' ? styles.page : styles.page_form_open}
			>
				<PageNew
					activeCard={activeCard}
					setViewToShow={setViewToShow}
					setActiveCard={setActiveCard}
					config={config}
					formatParams={formatParams}
				/>
			</div>
			{renderCard()}
		</div>
	);
}
export default Locations;
