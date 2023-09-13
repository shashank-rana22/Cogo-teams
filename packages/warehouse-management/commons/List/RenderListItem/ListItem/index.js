import { Placeholder, cl } from '@cogoport/components';

import getValue from './getValue';
import styles from './styles.module.css';

const NO_MARGIN = 0;
const SPAN_ONE = 1;

function ListItem({
	activeTab = '',
	fields = [],
	item = [],
	functions = {},
	loading = false,
	isMobile = false,
	isOpen = '',
	Child = <div />,
	listAPI = () => {},
}) {
	return (
		<div>
			<section
				className={styles.list_container}
				style={{
					'--open-margin': isOpen ? NO_MARGIN : '16px',
				}}
			>
				<div
					className={cl`${styles.row} ${
						isMobile ? styles.is_mobile : ''
					}`}
				>
					{fields.map((field) => (
						<div
							className={cl`${styles.col} ${field.className || ''} ${
								isMobile ? styles.is_mobile : ''
							}`}
							style={{
								'--span': (field.span || SPAN_ONE),
							}}
							key={field.key}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}

							{loading ? <Placeholder />
								: (
									<div>
										{field.render ? field.render(item) : getValue({
											itemData   : item,
											itemField  : field,
											functions,
											emptyState : '-',
										})}
									</div>
								)}
						</div>
					))}
				</div>
			</section>
			{activeTab === 'schedules' && isOpen === item?.warehouseTransferId && (
				<Child
					boxCount={item?.box}
					packageDetails={item?.packageDetails}
					shipmentDetails={item?.shipmentDetails}
					listAPI={listAPI}
				/>
			)}
			{activeTab === 'inventory' && isOpen === item?.shipmentId && (
				<Child
					data={item?.details}
					listAPI={listAPI}
				/>
			)}
		</div>
	);
}

export default ListItem;
