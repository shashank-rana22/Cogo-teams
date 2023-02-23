import { ButtonIcon, Placeholder } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function NotesList({
	list = [],
	handleClick = () => {},
	handleDelete = () => {},
	listLoading,
}) {
	if (isEmpty(list)) {
		return (
			<div className={styles.empty_div}>
				No Data Found...
			</div>
		);
	}
	return (
		listLoading ? (
			[(list || []).length].map(() => (
				<div className={styles.notes_container}>
					<div className={styles.content}>
						<Placeholder height="18px" width="130px" />
					</div>
					<div className={styles.footer}>
						<div className={styles.note_time}>
							<Placeholder height="14px" width="80px" />
						</div>
						<div className={styles.created_by}>
							<Placeholder height="14px" width="30px" />
						</div>
					</div>
				</div>
			))
		)
			: (
				<>
					{(list || []).map((item) => {
						const { notes_data, agent_data, updated_at, id } = item;
						const { name = '' } = agent_data || {};
						return (
							<div className={styles.notes_container}>
								<div
									className={styles.content}
									onClick={() => handleClick(item)}
									role="presentation"
								>
									{(notes_data || []).map((i) => (i || 'NA'))}
								</div>
								<ButtonIcon
									size="sm"
									icon={<IcMDelete onClick={() => handleDelete(id)} />}
									themeType="primary"
								/>
								<div className={styles.footer}>
									<div
										className={styles.note_time}
									>
										{format(updated_at, 'HH:mm a dd MMM')}
									</div>
									<div className={styles.created_by}>{name}</div>
								</div>
							</div>
						);
					})}
				</>
			)
	);
}
export default NotesList;
