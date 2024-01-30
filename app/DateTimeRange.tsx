import React, {useState, MouseEvent} from 'react';
import {  rem, Popover } from '@mantine/core';
import {TimeInput, DatePicker, DatesRangeValue} from '@mantine/dates';
import { format } from "date-fns";
import { IconChevronDown } from '@tabler/icons-react';
import {DateTimeRangeType, isDateValid} from "@/app/shared";

export function DateTimeRange({getDatesAndTime, dates, time}: DateTimeRangeType) {
    const [datesArray, setDatesArray] = useState(dates);
    const [timeArray, setTimeArray] = useState(time);
    const [showDateTimeRangePicker, setShowDateTimeRangePicker] = useState(false);

    const handleShowPicker = (event: MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        typeof target.showPicker === 'function' && target.showPicker();
    }

    const formatForLabel = (date: Date | null) => date ? `${format(date, 'EEE, MMM dd, yyyy')}` : '';

    const [labelDateTimeRange, setLabelDateTimeRange] = useState<string>(`${formatForLabel(datesArray[0])} - ${formatForLabel(datesArray[1])}`);

    const handleDateTimeInputChange = ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setLabelDateTimeRange(value)
        const [pickUpDate, dropOffDate] = value.split(' - ')

        isDateValid(pickUpDate) && setDatesArray(prevDatesState => [new Date(pickUpDate), prevDatesState[1]])
        isDateValid(dropOffDate) && setDatesArray(prevDatesState => [prevDatesState[0], new Date(dropOffDate)])

        getDatesAndTime({dates: [new Date(pickUpDate), new Date(dropOffDate)], time: timeArray})
    }

    const handleDatePickerChange = (dates: Date[]) => {
        setDatesArray(dates);
        setLabelDateTimeRange(`${formatForLabel(dates[0])} - ${formatForLabel(dates[1])}`)
        if (dates[0] !== null && dates[1] !== null) {
            setShowDateTimeRangePicker(false);
        }

        getDatesAndTime({dates, time: timeArray})
    }

    const handleTimeChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target
        let tempTime = ['']
        setTimeArray(prevTimeState => {
            tempTime = [...prevTimeState]
            tempTime[Number(name)] = value
            return tempTime
        })

        getDatesAndTime({dates: datesArray, time: tempTime})
    }

    const handleClosePopover = () => {
        setLabelDateTimeRange(`${formatForLabel(datesArray[0])} - ${formatForLabel(datesArray[1])}`)
        setShowDateTimeRangePicker(false);
    }

    const pickerControl = <IconChevronDown style={{ width: rem(16), height: rem(16) }} stroke={1.5} />

    return (
        <Popover opened={showDateTimeRangePicker} onChange={handleClosePopover}  position="bottom" withArrow shadow="md" >
            <Popover.Target>
                <input
                    className={'w-full text-center border-2 border-black rounded-lg'}
                    type="text"
                    value={labelDateTimeRange}
                    onClick={() => setShowDateTimeRangePicker(true)}
                    onChange={handleDateTimeInputChange}
                />
            </Popover.Target>
            <Popover.Dropdown>
                <DatePicker type="range" value={datesArray as [Date, Date]} onChange={handleDatePickerChange as (value: DatesRangeValue) => void} />
                <TimeInput
                    label="Pick up time"
                    name={"0"}
                    value={timeArray[0]}
                    onChange={handleTimeChange}
                    onClick={handleShowPicker}
                    rightSection={pickerControl}
                    rightSectionPointerEvents="none"

                />
                <TimeInput
                    label="Drop off time"
                    name={"1"}
                    value={timeArray[1]}
                    onChange={handleTimeChange}
                    onClick={handleShowPicker}
                    rightSection={pickerControl}
                    rightSectionPointerEvents="none"
                />
            </Popover.Dropdown>
        </Popover>
    );
}