import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function DatePickerFa({ value, onChange }) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      calendar={persian}
      locale={persian_fa}
      minDate={new Date()} // فقط از فردا به بعد
      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
    />
  )
}
