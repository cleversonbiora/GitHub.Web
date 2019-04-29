import React, { Component } from 'react';
import {GetById} from '../Services/GitHubService';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: null
    };
    this.getRepository(this.props.match.params.id);
  }
  getRepository(id){
    GetById(id).then(json => {
      if(json.success){
        this.setState({repository: json.data});
      }else{
        ToastsStore.error(json.errors.map(erro => erro));
      }
    }).catch(error => ToastsStore.error("Falha na busca"));
  }
  render() {
    if(!this.state.repository){
      return(
      <div className="App">
        <header className="App-header">
          <p>
            Carregando...
          </p>
        </header>
          <ToastsContainer store={ToastsStore}/>
      </div>);
    }
    const {
        name,
        description,
        htmlUrl,
        owner,
        readMe
    } = this.state.repository;
    return (
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <div className="container">
                <h1>{name}</h1>
                <p className="lead">{description}</p>
                <a href={htmlUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ver no GitHub</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 card">
              <div className="card-body">
                <img src={owner.avatarUrl} alt="Imagem do Autor" style={{height:"50px"}}/>
                <h5 className="card-title">{owner.login}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Autor</h6>
                <a href={owner.htmlUrl} target="_blank" rel="noopener noreferrer" className="card-link">Ver no GitHub</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12"
                style={{padding:"20px"}}>
            <ReactMarkdown
                source={readMe} 
                escapeHtml={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Link to='/' className="btn btn-default btn-lg">Voltar</Link>
            </div>
          </div>
          <ToastsContainer store={ToastsStore}/>
        </div>
    );
  }
}
export default Repository;
