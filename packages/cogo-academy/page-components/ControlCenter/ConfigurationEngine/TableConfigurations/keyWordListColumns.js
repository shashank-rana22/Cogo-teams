import { Popover, Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import PopOverContent from '../../../../commons/PopoverContent';

import styles from './styles.module.css';

function keyWordListColumns({
	onClickEdit,
	onClickDeleteIcon,
	showPopOver,
	setShowPopOver,
	updateApiLoading,
	activeTag,
}) {
	const onClickNoButton = () => {
		setShowPopOver(null);
	};

	const listColumns = [
		{
			Header   : 'KEY WORD NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'KEY WORD DESCRIPTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.description) || '--'}
				</div>
			),
		},
		{
			Header   : 'UPDATED BY',
			accessor : (items) => {
				const { author = {} } = items || {};
				return (
					<div className={styles.tags}>
						{startCase(author?.name) || '--'}
					</div>
				);
			},
		},
		{
			Header   : 'UPDATED AT',
			accessor : (items) => (
				<div className={styles.tags}>
					{format(items.created_at, 'dd MMM yy') || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div className={styles.button_container}>

					{activeTag === 'inactive' ? (
						<Button
							themeType="secondary"
							size="sm"
							style={{ marginRight: 8 }}
							onClick={() => onClickEdit(item)}
						>
							RESTORE

						</Button>
					)
						: (
							<>
								<Popover
									placement="top"
									interactive
									visible={showPopOver === item?.id}
									styles={{ marginRight: '20px' }}
									render={(
										<PopOverContent
											source="tag"
											onCLickYesButton={() => onClickDeleteIcon(item)}
											onClickNoButton={() => onClickNoButton(item)}
											loading={updateApiLoading}
										/>
									)}
								>

									<div className={styles.delete_button}>
										<IcMDelete
											height={20}
											width={20}
											onClick={() => {
												setShowPopOver(() => (showPopOver === item?.id ? null : item?.id));
											}}
										/>
									</div>
								</Popover>

								<Button
									themeType="secondary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => onClickEdit(item)}
								>
									EDIT

								</Button>

							</>
						)}
				</div>
			),
		},
	];
	return { listColumns };
}

export default keyWordListColumns;
