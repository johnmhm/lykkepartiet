import React, { Component } from 'react';
import ProposalListSection from './ProposalListSection.js';
import { Home, RotateCcw, Search } from 'react-feather'

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Alle',
      status: 'Alle',
      history: false,
      subscription: true
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSection = this.changeSection.bind(this);
  }

  changeSection(event) {
    const selectedSection = event.target.name
    this.props.updateState({entityType: 'selectedSection', entity: {selectedSection}})
  }

  changeFilter(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const proposalList = this.props.proposalList
    const preferenceList = this.props.preferenceList
    const filterSelection = {
      category: this.state.category,
      status: this.state.status,
      section: this.props.selectedSection
    }
    return (
      <div className="mw8 center">
        <div>
          <a name="all" onClick={this.changeSection} className={(this.props.selectedSection === 'all' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 br1 shadow-6 mr2" }><Search className="mr1"/>Opdag</a>
          <a name="personal" onClick={this.changeSection} className={(this.props.selectedSection === 'personal' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 br1 shadow-6 mr2" }><Home className="mr1"/>Mine forslag</a>
          <a name="history" onClick={this.changeSection} className={(this.props.selectedSection === 'history' ? "bg-white cursor-default" : "bg-near-white pointer")  + " dib b ph3 pv2 ba b--black-10 shadow-6 br1" }><RotateCcw className="mr1"/>Historik</a>
        </div>
        <div>
          <div>
            Kategori: <select name="category" value={this.state.category} onChange={this.changeFilter} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                {preferenceList.map((item) =>
                    <option key={item.id}>{item.title}</option>
                )}
            </select>
          </div>
          <div>
            Status: <select name="status" value={this.state.status} onChange={this.changeFilter} className="w-100 pv1 ph2 bg-near-white ba b--light-gray br2">
                <option>Alle</option>
                <option>Fremsat</option>
                <option>Til endelig afstemning</option>
                <option>Afsluttet</option>
            </select>
          </div>
        </div>
        <ProposalListSection proposalList={proposalList} filterSelection={filterSelection}/>
      </div>
    )
  }
}

export default Root;
