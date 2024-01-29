import {Dispatch, SetStateAction, useRef, useState} from "react";
import {format} from "date-fns";
import {compareAsc} from "date-fns/compareAsc";

const useFormattedState = (initialValue: string[] | Date[]): [string, Dispatch<SetStateAction<string[] | Date[]>>] => {
    const [state, setState] = useState(initialValue);
    const isDateValid = (dateStr: Date | string | null) => dateStr && String(new Date(dateStr)) !== 'Invalid Date'
    const formatForLabel = (dates: Date[] | string[]) => {
        const sortedDates = [...dates].map(date => new Date(date)).sort(compareAsc);
        return sortedDates && isDateValid(sortedDates[0]) && isDateValid(sortedDates[1]) ? `${format(new Date(sortedDates[0]), 'EEE, MMM dd, yyyy')} - ${format(new Date(sortedDates[1]), 'EEE, MMM dd, yyyy')}` : '';
    };
    const formattedState = formatForLabel(state);

    return [formattedState, setState];
}

export {useFormattedState}