import { Button } from '@cogoport/components';
import { IcMTick, IcCFtick } from '@cogoport/icons-react';
import React from 'react';

import DatePicker from './date-picker';
import OpenModal from './modal-div';
import NotesHrbp from './notes-hr';
import Servicelist from './services-list';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';
import useAdminClearanceDetails from './useAdminClearanceDetails';

function AdminClearance({ data = {}, refetch = () => {} }) {
	const {
		show,
		setShow,
		is_complete,
		control,
		errors,
		handleSubmit,
		watch,
		onSubmit,
	} = useAdminClearanceDetails({ data, refetch });
	const termsChecked = watch('termsAcceptance');
	return (
		<div className={styles.container}>
			<div className={styles.container_main}>
				<div className={styles.title}>Admin Clareance</div>
				<div className={styles.sub_title}>Collection of company assets</div>

				{is_complete ? (
					<div className={styles.tick_div}>
						<IcCFtick
							className={styles.tick_icon}
						/>
						<span>You have successfully completed your tasks. No further changes are allowed.</span>
					</div>
				) : null}

				<DatePicker control={control} errors={errors} is_complete={is_complete} />
				<Servicelist control={control} errors={errors} is_complete={is_complete} />
				<NotesHrbp control={control} errors={errors} is_complete={is_complete} />
			</div>
			<TermsConditions
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				termsChecked={termsChecked}
				is_complete={is_complete}
			/>
			<div className={styles.button_div}>
				<Button
					className={styles.admin_button}
					onClick={handleSubmit(() => setShow(!show))}
					disabled={is_complete}
				>
					Provide Clearance
					<IcMTick
						width={16}
						height={16}
					/>
				</Button>
			</div>

			<OpenModal
				show={show}
				onClose={() => setShow(false)}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default AdminClearance;
