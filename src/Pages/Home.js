import React, { Component } from 'react';
import {ListTop} from '../Services/GitHubService';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import ListItem from '../Components/ListItem';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      languange: this.props.match.params.languange ? decodeURIComponent(this.props.match.params.languange) : 'c#'
    };
    this.getRepositories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.languange !== prevProps.match.params.languange) {
      this.setState({languange: this.props.match.params.languange ? decodeURIComponent(this.props.match.params.languange) : 'c#'});
      this.getRepositories();
    }
  }
  getRepositories(){
    ToastsStore.info("Carregando...");
    let language = this.props.match.params.languange ? decodeURIComponent(this.props.match.params.languange) : 'c#';
    ListTop(language, 10).then(json => {
      if(json.success){
        this.setState({repositories: json.data});
      }else{
        ToastsStore.error(json.errors.map(erro => erro));
      }
    }).catch(error => ToastsStore.error("Falha na busca"));
  }

  render() {
    const repositories = this.state.repositories.map(function(repo, idx) {
      return <ListItem key={idx} {...repo}/>
    });
    return (
        <div className="container">
          <div className="row">
          <div className="jumbotron col-12">
            <div className="container">
              <h1>GitHub Trending Topics</h1>
              <p className="lead">Esta página lista os repositórios com mais estrelas no GitHub.</p>
            </div>
          </div>
          </div>
          <div className="row">
            <div className="col-3">
              <ul className="list-group">
                <li className={`list-group-item ${(this.state.languange === 'c#' ? 'active':'')}`}>
                  <Link to={`/l/c%23`}>C#</Link>
                </li>
                <li className={`list-group-item ${(this.state.languange === 'javascript' ? 'active':'')}`}>
                  <Link to={`/l/javascript`}>JavaScript</Link>
                </li>
                <li className={`list-group-item ${(this.state.languange === 'c++' ? 'active':'')}`}>
                  <Link to={`/l/c++`}>C++</Link>
                </li>
                <li className={`list-group-item ${(this.state.languange === 'kotlin' ? 'active':'')}`}>
                  <Link to={`/l/kotlin`}>Kotlin</Link>
                </li>
                <li className={`list-group-item ${(this.state.languange === 'swift' ? 'active':'')}`}>
                  <Link to={`/l/swift`}>Swift</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              {repositories}
            </div>
          </div>
          <ToastsContainer store={ToastsStore}/>
        </div>
    );
  }
}
export default Home;
