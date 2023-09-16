import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const API_DATA_MAPPING = {
	hr_meet             : 'hr_meet',
	rm_clearance        : 'rm_clearance.rm_clearance',
	review_request      : 'rm_clearance.review_request',
	assign_hoto         : 'rm_clearance.assign_hoto',
	finance_clearance   : 'finance_clearance',
	hoto_clearance      : 'hoto_clearance',
	admin_clearance     : 'admin_clearance',
	tech_clearance      : 'tech_clearance',
	exit_interview      : 'exit_interview.exit_interview',
	interview_scheduled : 'exit_interview.interview_scheduled',
	interview_completed : 'exit_interview.interview_completed',
};

function SubStep({ description = '', stepCompleted = false, stepActive = false }) {
	return (
		<div
			className={cl`
                ${styles.step}
                ${stepCompleted ? styles.step_completed : ''}
                ${cl.ns('stepper_step')}
                ${stepCompleted ? cl.ns('stepper_step_completed') : ''}
				${stepActive ? styles.sub_step_active : ''}
				${styles.cursor_auto}
            `}
			role="presentation"
		>
			<div
				className={cl`
				${styles.sub_step_active_wrapper}
                    ${styles.sub_step_wrapper}
                    ${cl.ns('stepper_step_wrapper')}
                `}
			>
				{stepCompleted ? (
					<div
						className={cl`
                    ${styles.step_wrapper}
					${styles.sub_step_wrapper_tick}
                    ${cl.ns('stepper_step_wrapper')}
                `}
					>
						<IcMTick width={20} height={20} />
					</div>
				) : null}
			</div>
			<div
				className={cl`
                    ${styles.text}
					${styles.sub_type_text}
                    ${cl.ns('stepper_text')}`}
			>
				{description}
			</div>
		</div>
	);
}

function Step({
	num = 0,
	description = '',
	stepCompleted = false,
	items = [],
	stepActive = false,
	itemsLength = 0,
	click = false,
	data = {},
}) {
	return (
		<div className={cl`
        ${stepActive ? styles.step_active : ''}
    `}
		>
			<div
				className={cl`
                ${styles.main_step}
                ${click ? styles.clickable_step : ''}
                ${stepCompleted ? styles.step_completed : ''}
                ${cl.ns('stepper_step')}
                ${stepCompleted ? cl.ns('stepper_step_completed') : ''}
            `}
				role="presentation"
			>
				<div
					className={cl`
                    ${styles.step_wrapper}
					${styles.main_step_wrapper}
                    ${cl.ns('stepper_step_wrapper')}
                `}
				>
					{stepCompleted ? (
						<IcMTick width={20} height={20} />
					) : num}

				</div>
				<div
					className={cl`
                    ${styles.text}
					${styles.main_text}
                    ${cl.ns('stepper_text')}`}
				>
					{description}
				</div>
			</div>
			<div className={styles.subtask}>
				<div
					className={cl`
                                    ${itemsLength !== Number(num) ? styles.step_connector : styles.last_step_connector}
                                    ${styles.step_connector_inactive}
                                    ${itemsLength !== Number(num) && cl.ns('stepper_step_connector')}
                                    ${cl.ns('stepper_step_connector_inactive')}
                                `}
				/>
				<div style={{ padding: '12px 8px' }}>
					{items.length > GLOBAL_CONSTANTS.zeroth_index ? items.map((val, index) => (
						<div
							key={val.title}
							onClick={(e) => e.stopPropagation()}
							aria-hidden
						>
							<SubStep
								num={(index + GLOBAL_CONSTANTS.one).toString()}
								description={val.title}
								stepCompleted={getByKey(data, API_DATA_MAPPING[val.key]) === 'completed'}
								stepActive={getByKey(data, API_DATA_MAPPING[val.key]) === 'active'}
							/>
							{' '}
						</div>
					)) : null}
				</div>
			</div>
		</div>
	);
}

function Stepper({
	id = 0,
	className = '',
	style = {},
	items = [],
	shadowed = false,
	direction = 'horizontal',
	enableForwardClick = false,
	data = {},
	handleCurrentTask = () => {},
}) {
	return (
		<div
			id={id}
			className={cl`
                ${className}
                ${styles.container}
                ${cl.ns('stepper_container')}
                ${cl.preset('direction', direction)}
                ${(shadowed && direction !== 'vertical') ? styles.shadowed : ''}
            `}
			style={style}
		>

			{items.map((item, i) => (
				<div
					className={cl`
                            ${styles.step_map}
                            ${cl.ns('stepper_step_map')}
                        `}
					key={item.key}
					onClick={() => handleCurrentTask(item.view_type)}
					aria-hidden
				>

					<Step
						num={(i + GLOBAL_CONSTANTS.one).toString()}
						description={item.title}
						items={item.subtask || []}
						itemsLength={items.length}
						stepCompleted={getByKey(data, API_DATA_MAPPING[item.key]) === 'completed'}
						stepActive={getByKey(data, API_DATA_MAPPING[item.key]) === 'active'}
						data={data}
						click={enableForwardClick}
					/>
				</div>
			))}
		</div>
	);
}

export default Stepper;
