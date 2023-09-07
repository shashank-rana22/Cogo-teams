import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import DeleteModal from './DeleteModal';
import FormDataOne from './FormDataOne';
import FormDataTwo from './FormDataTwo';
import styles from './styles.module.css';

function ColumnCard({
	config = {},
	item = {},
	openConfig = [],
	setOpenConfig = () => {},
	refetch = () => {},
	loading = false,
	setSaveObj = () => {},
}) {
	const { fields } = config || {};
	const [deleteModal, setDeleteModal] = useState(false);

	const openDeleteModal = () => {
		setDeleteModal(true);
	};
	const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities)?.map((entity_option) => ({
		value : entity_option.toString(),
		label : `${entity_option} - ${GLOBAL_CONSTANTS.cogoport_entities[entity_option].name}`,
	}));
	const isEdit = (openConfig || []).includes(item?.id);

	return (
		<div className={styles.columnCardComponent}>
			<div className={styles.flex}>
				{ !isEdit ? (
					<FormDataOne
						item={item}
						isEdit={isEdit}
						setOpenConfig={setOpenConfig}
						openDeleteModal={openDeleteModal}
						fields={fields}
						loading={loading}

					/>
				)
					: (
						<FormDataTwo
							fields={fields}
							item={item}
							isEdit={isEdit}
							ENTITY_OPTIONS={ENTITY_OPTIONS}
							setOpenConfig={setOpenConfig}
							setSaveObj={setSaveObj}
							refetch={refetch}
							loading={loading}
						/>
					) }

			</div>
			{deleteModal
				&& (
					<DeleteModal
						deleteModal={deleteModal}
						setDeleteModal={setDeleteModal}
						refetch={refetch}
						id={item?.id}
					/>
				) }
		</div>
	);
}
export default ColumnCard;
