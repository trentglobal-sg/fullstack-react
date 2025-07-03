import { useEffect, useState } from "react";

export default function TodoForm(props) {
    const [title, setTitle] = useState("" || props.title);
    const [dateDue, setDateDue] = useState(
        props.dateDue ? props.dateDue.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    );
    const [urgency, setUrgency] = useState(1 || props.urgency);

    useEffect(()=>{
        setTitle(props.title);
        setDateDue(props.dateDue?.toISOString().split('T')[0]);
        setUrgency(props.urgency);
    }, [props.title, props.dateDue, props.urgency])

    const submitForm = (event) => {
        // prevent form submission
        event.preventDefault();
        props.onSubmit(title, dateDue, urgency);
    }
    return <>
        <form onSubmit={submitForm}>
            <div className="mb-3">
                <label>Title:</label>
                <input type="text"
                    className="form-control"
                    value={title}
                    onChange={ e => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Date Due:</label>
                <input type="date"
                    value={dateDue}
                    className="form-control"
                    onChange={e =>setDateDue(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Urgency</label>
                <div className="form-check form-check-inline">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                value={n}
                                onChange={e =>setUrgency(e.target.value)}
                                checked={parseInt(urgency) === n}
                            />
                            <label className="form-check-label" htmlFor={`inlineRadio${n}`}>
                                {n}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn btn-primary">{props.action}</button>
            <a className="btn btn-danger" onClick={()=>{
                props.onCancel();
                setTitle("");
                setDateDue(new Date().toISOString().split('T')[0]);
                setUrgency(1);
            }}>Cancel</a>
        </form>

    </>

}