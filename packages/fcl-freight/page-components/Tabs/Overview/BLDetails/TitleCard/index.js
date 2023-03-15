import { cl } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import documentType from './documentType';
import styles from './styles.module.css';

function TitleCard({
	item = {},
	setOpen = () => {},
	open = false,
	setActiveId = () => {},
	activeId = '',
	shipment_data = {},
}) {
	const { doc_type } = documentType(item?.bl_document_type);

	const handleClick = (id) => {
		if (open && activeId === id) {
			setOpen(false);
			setActiveId('');
		} else {
			setOpen(true);
			setActiveId(id);
		}
	};

	return (
		<div className={cl` ${styles.container} title-card`}>
			<div className={styles.display_card}>
				{shipment_data?.shipment_type === 'fcl_freight' ? (
					<div className={styles.details}>
						<div className={styles.title_container}>
							<div className={styles.document_type}>
								{doc_type}
								{startCase(item?.status)}
								:
							</div>

							<div className={styles.ontrack}>
								{`${startCase(item?.containers_count || 0)} ${
									item?.containers_count === 1 ? 'Container' : 'Containers'
								} on track`}
							</div>

							{item?.containers_rolled_over ? (
								<div className={styles.roll_over}>
									,
									{startCase(item?.containers_rolled_over)}
									rolled over
								</div>
							) : null}
						</div>
					</div>
				) : null}

				<div className={styles.bl_number}>
					{shipment_data?.shipment_type === 'air_freight' ? (
						<>AWB Number</>
					) : (
						<>BL Number</>
					)}
					:
					{' '}
					{item?.bl_number}
					{' '}
				</div>
			</div>

			{!isEmpty(item?.container_details) ? (
				<div className={styles.caret_box} onClick={() => handleClick(item?.id)} role="button" tabIndex={0}>
					<IcMArrowRotateDown />
				</div>
			) : (
				<div style={{ marginRight: '50px' }} />
			)}
		</div>
	);
}

export default TitleCard;
