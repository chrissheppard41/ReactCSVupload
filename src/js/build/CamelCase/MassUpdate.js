import React, { Component } from 'react';
import Ajax from '../Ajax';


class MassUpdate extends Component {
    constructor () {
        super();

        this.state = {
            field: "",
            location: ""
        };
    }

    updateLocation (event) {
        this.setState({
            location: event.target.value
        });
    }

    updateField (event) {
        this.setState({
            field: event.target.value
        });
    }

    submit (event) {
        event.preventDefault();
        var _self = this;
        var call = Ajax("http://localhost:9000/updateCamelCase", "json", "Api-call");
        call.setType("POST");

        var packet = {
            field: this.state.field,
            path: this.state.location
        };
        call.setData(JSON.stringify(packet));
        call.exec().then(function (data) {
            _self.setState({
                data: data,
                stage2: "show"
            });
        });

        return false;
    }

    render() {
        return (
            <div>
                <form action method="POST" onSubmit={this.submit.bind(this)} className="form-horizontal">
                    <div className="form-group row">
                        <label htmlFor="inputLocation" className="col-sm-2 control-label">Update field</label>
                        <div className="col-sm-10">
                            <input type="text" name="inputLocation" id="inputLocation" className="form-control" value={this.state.field} onChange={this.updateField.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputLocation" className="col-sm-2 control-label">Location</label>
                        <div className="col-sm-10">
                            <input type="text" name="inputLocation" id="inputLocation" className="form-control" value={this.state.location} onChange={this.updateLocation.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MassUpdate;
