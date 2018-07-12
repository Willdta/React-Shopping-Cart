import React from 'react'

const SelectOptions = ({ name, province, onChange }) => (
  <select className="checkout-button-style" name={name} value={province} onChange={onChange}>
    <option value=""></option>
    <option value="NL">NL</option>
    <option value="PE">PE</option>
    <option value="NS">NS</option>
    <option value="NB">NB</option>
    <option value="QC">QC</option>
    <option value="ON">ON</option>
    <option value="MB">MB</option>
    <option value="SK">SK</option>
    <option value="AB">AB</option>
    <option value="BC">BC</option>
    <option value="YT">YT</option>
    <option value="NT">NT</option>
    <option value="NU">NU</option>
  </select>
)

export default SelectOptions