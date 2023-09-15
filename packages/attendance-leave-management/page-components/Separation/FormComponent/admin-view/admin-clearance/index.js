import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick, IcCFtick } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import DatePicker from './date-picker';
import OpenModal from './modal-div';
import NotesHrbp from './notes-hr';
import Servicelist from './services-list';
import styles from './styles.module.css';
import TermsConditions from './terms-conditions';

function AdminClearance({ data = {}, refetch = () => {} }) {
	const [show, setShow] = useState(false);
	const admin_clearance = data?.admin_clearance || {};
	const applicant_details = data?.applicant_details || {};
	const { last_working_day } = applicant_details || null;
	const { sub_process_detail_id } = admin_clearance?.admin_clearance || {};
	const { sub_process_data } = admin_clearance?.admin_clearance || {};
	const { is_complete } = admin_clearance?.admin_clearance || false;

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
		setValue,
		reset,
	} = useForm();
	const termsChecked = watch('termsAcceptance');

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch, setShow });

	const onSubmit = (values) => {
		const notes = [{
			label                  : 'notes for hrbp',
			Value                  : values.notes,
			Is_shared_with_manager : true,

		}];
		const payload = {
			sub_process_data: {
				notes,
				accessCardStatus : values?.accessCardStatus,
				termsAcceptance  : values?.termsAcceptance,
				specify          : values?.specify,
				parkingCharges   : values?.parkingCharges,
				otherCharges     : values?.otherCharges,
				name             : values?.name,
				last_working_day,
				idCardStatus     : values?.idCardStatus,
				companyAssets    : values?.companyAssets,

			},
			sub_process_detail_id,
			process_name: 'admin_clearance',
		};
		updateApplication({
			payload,
		});
		reset();
	};

	useEffect(() => {
		if (is_complete) {
			setValue('last_working_day', new Date(sub_process_data?.last_working_day));
			setValue('accessCardStatus', sub_process_data?.accessCardStatus);
			setValue('companyAssets', sub_process_data?.companyAssets);
			setValue('idCardStatus', sub_process_data?.idCardStatus);
			setValue('name', sub_process_data?.name);
			setValue('otherCharges', sub_process_data?.otherCharges);
			setValue('parkingCharges', sub_process_data?.parkingCharges);
			setValue('specify', sub_process_data?.specify);
			setValue('notes', sub_process_data?.notes[GLOBAL_CONSTANTS.zeroth_index].Value);
			setValue('termsAcceptance', sub_process_data?.termsAcceptance);
		} else if (last_working_day) {
			setValue('last_working_day', new Date(last_working_day));
		}
	}, [setValue, data, sub_process_data, is_complete, last_working_day]);

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
			{!is_complete ? (
				<>
					<TermsConditions
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						termsChecked={termsChecked}
					/>
					<div className={styles.button_div}>
						<Button
							className={styles.admin_button}
							onClick={() => setShow(!show)}
						>
							Provide Clearance
							<IcMTick
								width={16}
								height={16}
							/>
						</Button>
					</div>
				</>
			) : null}

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
