// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { DateInputProps, FieldSchema } from '../types';
import { DatePicker } from 'antd';
import '../index.css';
import dayjs, { isDayjs } from 'dayjs';

type FilterProps = {
  field: FieldSchema;
  value: any;
  onChange: (values: any) => void;
};

const castDefaultValue = (value: string | dayjs.Dayjs) => {
  if (value) {
    if (isDayjs(value)) return value;
    if (dayjs(value).isValid()) return dayjs(value);
  }
  return value
}

const DateFilter: React.FC<FilterProps> = props => {
  const {
    field,
    value,
    onChange,
  } = props;

  const {
    inputProps = {}
  } = (field.input || {}) as DateInputProps;

  const [internalValue, setInternalValue] = useState<dayjs.Dayjs | undefined>(castDefaultValue(value));

  useEffect(() => {
    setInternalValue(castDefaultValue(value));
  }, [value]);

  const handleChange = (value) => {
    setInternalValue(value);
    onChange({ [field.name]: value });
  }

  return (
    <DatePicker
      {...inputProps}
      placeholder={field.label}
      className={`wand__inline-filter__datepicker ${internalValue ? 'wand__inline-filter__datepicker--filled' : ''}`}
      value={internalValue}
      onChange={handleChange}
    />
  )
}

export default DateFilter;
