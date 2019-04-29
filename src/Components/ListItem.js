import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ListItem extends Component {
  render() {
    const {
        name,
        description,
        id,
        htmlUrl
    } = this.props;
    return (
      <div className="card" style={{marginBottom:"5px"}}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <Link to={`/repository/${id}`} className="btn btn-success">Detalhes</Link>&nbsp;
          <a href={htmlUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ver no GitHub</a>
        </div>
      </div>
    );
  }
}
export default ListItem;
