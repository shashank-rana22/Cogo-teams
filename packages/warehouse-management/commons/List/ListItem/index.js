import { Placeholder, cl } from '@cogoport/components';

import styles from './styles.module.css';

const NO_MARGIN = 0;
const SPAN_ONE = 1;

function ListItem({
	fields = {},
	item = [],
	// functions = {},
	loading = false,
	isMobile = false,
	isOpen = '',
	Child = () => {},
	setViewDoc = () => {},
	setItem = () => {},
	listAPI = () => {},
	edit = false,
	setEdit = () => {},
	setGenerate = () => {},
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
								// ...itemStyle,
							}}
							key={field.key}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}

							{loading ? <Placeholder />
								: (
									<div>
										{field?.render(item) || 'ff'}
										{/* {item?.zoneName} */}
										{/* // getValue(
										// 	item,
										// 	field,
										// 	functions,
										// 	'-',
										//) */}
									</div>
								)}
						</div>
					))}
				</div>
			</section>
			{isOpen === item.id && (
				<Child
					data={item}
					setViewDoc={setViewDoc}
					setItem={setItem}
					listAPI={listAPI}
					edit={edit}
					setEdit={setEdit}
					setGenerate={setGenerate}
				/>
			)}
		</div>
	);
}

export default ListItem;
