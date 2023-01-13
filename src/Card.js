function Card(props) {
    return (
        <div className="container">
            <div className="card" style={{ width: 'auto'}}>
                <img className="card-img-top" src={''} alt="Card image cap" />
                <div className="card-body">
                    <h3 className="card-title"> {props.qc.t} </h3>
                    <p className="card-text">
                        {props.qc.d}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card;