import React, { Fragment, useRef } from "react"

const ListSearch = (props) => {

    const inputEl = useRef('')

    return (
        <Fragment>
            <label className="label" htmlFor="search">Search topics</label>
            <input className="input is-small" placeholder="enter search term" id="search" ref={inputEl} />
            <button className="button is-small is-info" onClick={() => props.onSearchMessages(inputEl.current.value)}>search</button>
            <button className="button is-small is-danger" onClick={() => {
                inputEl.current.value = ''
                props.onSearchMessages()
            }}>
                clear
            </button>
        </Fragment>
    )
}

export default ListSearch