import { useState } from "react";

function Card(props) {
    return (
        <div key={props.id} className="card" tyle={{ width: '300px' }}>
            <img className="card-img-top" src={props.img} alt="Card image" style={{ width: '380px', height: 'auto' }} />
            <div className="card-body">
                <h3 className="card-title"> {props.title} </h3>
                <p className="card-text">
                    {props.desc}
                </p>
            </div>
            {!props.disable ? <button className="btn btn-success" onClick={() => props.handleSelect(props.id)}>Select</button> : null}
        </div>
    )
}

export default Card;