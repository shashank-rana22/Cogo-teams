import { cl, Placeholder, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import itemFunction from '../../utils/itemFunction';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function Table({
	title = '', configs = [], filteredList = [], data = {}, loading = false,
	showPagination = true, setPage = () => {}, selectedContact = '', setSelectedContact = () => {}, isClickable = true,
	isScroll = false, maxHeight, itmFunction = {}, showHover = true,
}) {
	const { list: dataList = [], page = 0, page_limit = 0, total_count = 0 } = data || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const list = isEmpty(filteredList) ? dataList : filteredList;
	const newList = loading ? [...Array(5).keys()] : list;

	const newFunction = itemFunction({ ...itmFunction, t });

	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>

			<div className={styles.table}>
				<div className={styles.horizontal_scroll}>

					<div className={cl`${styles.flex_box} ${styles.card_header}`}>
						{configs.map((config) => (
							<div
								key={config.key}
								style={{ width: config?.width }}
								className={styles.col}
							>
								{config.title}
							</div>
						))}
					</div>

					<div
						style={{ maxHeight: maxHeight ?? '' }}
						className={isScroll ? styles.scroll_container : ''}
					>
						{newList.map((item) => (
							<div
								key={item?.id || item}
								className={`${styles.flex_box} ${styles.item_row} ${showHover ? styles.hover_row : ''}
							${(selectedContact?.id === item?.id && isClickable) ? styles.selected : ''}`}
								onClick={() => setSelectedContact(item)}
								role="presentation"
							>
								{configs.map((config) => (
									<div
										key={config.key}
										style={{ width: config?.width }}
										className={styles.col}
									>
										{loading ? <Placeholder margin="0px 0px 20px 0px" />
											: getValue(item, config, newFunction)}
									</div>
								))}
							</div>

						))}
					</div>
				</div>

				{!loading && showPagination && total_count > page_limit && (
					<div className={styles.pagination_container}>
						<Pagination
							type="compact"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPage}
						/>
					</div>

				)}
			</div>
		</div>
	);
}

export default Table;
