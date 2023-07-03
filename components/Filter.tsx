import React from 'react'


const Filter = (props: { filterSelect: React.ChangeEventHandler }) => {
    const { filterSelect } = props;
    return (
        <div className='filter_container'>
            <p className='eng'>
                Filter by: <select onChange={filterSelect} className='filter'>
                    <option value='default'>latest</option>
                    <option value="tag">types</option>
                    <option value="year">years</option>
                </select>
            </p>
        </div>

    )
}

export default Filter