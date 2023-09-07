import { Button, cl, Pill } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import columnsMapping from './columnsMapping';
import SlabsTable from './SlabsTable';
import styles from './styles.module.css';
import tagsMapping from './tagsMapping';

const LAST_INDEX = 1;

function Content({ columnDetails = {}, data = {} }) {
	const { label, getValue } = columnDetails;

	const value = getValue(data);

	return (
	// isLastItem is not taken care of
		<div className={`${styles.contentContainer}`}>

			{label ? <div className={styles.contentTitle}>{label}</div> : null}
			<div className={cl`${styles.flexContent} ${value}`}>
				<div className={cl`${styles.contentValue}`}>{value}</div>
			</div>
		</div>
	);
}

const columnsWithValue = ({ data, list }) => {
	const NEW_MAPPING_LIST = [];
	list.forEach((columnDetails) => {
		const { getValue } = columnDetails;

		const value = getValue(data);

		NEW_MAPPING_LIST.push({
			...columnDetails,
			value,
		});
	});

	return NEW_MAPPING_LIST;
};

function ListItem({ data = {}, onEdit = () => {} }) {
	const [open, setOpen] = useState(false);
	const tagsList = columnsWithValue({ data, list: tagsMapping });
	const columnsList = columnsWithValue({ data, list: columnsMapping });

	return (
		<div className={styles.container}>
			<div className={styles.upper}>
				{
                    data?.config_type === 'default' ? (<div className={styles.defaultTag}>Default</div>
                    ) : null
                }
				{/* Take care of additional class value */}
				<div className={styles.tagsList}>
					{tagsList.map((tabsDetails) => {
						const { key, value } = tabsDetails || {};
						return (
							<div
								key={key}
								className={styles.tagsRow}
							>
								{value ? <Pill size="md" color="green">{value}</Pill> : null }
							</div>
						);
					})}
				</div>
				<div className={styles.gridRow}>
					{columnsList.map((columnDetails, index) => {
						const { key } = columnDetails;
						return (
							<div key={key}>
								<Content
									key={key}
									data={data}
									columnDetails={columnDetails}
									isLastItem={index === columnsList.length - LAST_INDEX}
								/>
							</div>
						);
					})}
					<div className={styles.flexContent}>
						<Button
							themeType="secondary"
							size="md"
							style={{
								marginRight: '16px',
							}}
							onClick={onEdit}
						>
							View & Edit
						</Button>
					</div>
				</div>

			</div>
			<div className={styles.lower}>
				{open ? (
					<div
						className={styles.layoutContainer}
						key={data.cogo_entity_id}
					>
						<div className={styles.heading}>
							Slabs Details
						</div>
						<div className={styles.block}>
							<SlabsTable slabsDetailData={data?.slab_details} />
						</div>
					</div>
				) : null }
				<button
					className={styles.accordionContainer}
					onClick={() => setOpen(!open)}
				>
					{open ? (
						<>
							Hide Details
							{' '}
							<IcMArrowRotateUp />
						</>
					) : (
						<>
							View Details
							{' '}
							<IcMArrowRotateDown />
						</>
					)}
				</button>
			</div>
		</div>
	);
}
export default ListItem;
