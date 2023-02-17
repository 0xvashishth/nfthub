import React from 'react'
import { Outlet } from 'react-router-dom'

function Explorer() {
    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <select className='form-select'>
                            <option value="blockNumber">Block Number</option>
                            <option value="transaction">Block Hash</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <div class="d-flex">
                            <input className="form-control" id="hashInput" placeholder='Enter Hash/Block Number' />&nbsp;&nbsp;
                            <button className='btn btn-outline-light' onClick="">View</button>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default Explorer