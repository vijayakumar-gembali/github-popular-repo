import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const languageConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    languageStatusId: languageFiltersData[0].id,
    languageList: [],
    apiStatus: languageConstants.initial,
  }

  componentDidMount() {
    this.getGithubPopularRepos()
  }

  getGithubPopularRepos = async () => {
    this.setState({apiStatus: languageConstants.in_progress})
    const {languageStatusId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${languageStatusId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(product => ({
        name: product.name,
        id: product.id,
        issuesCount: product.issues_count,
        forksCount: product.forks_count,
        starsCount: product.stars_count,
        avatarUrl: product.avatar_url,
      }))
      this.setState({
        languageList: updatedData,
        apiStatus: languageConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: languageConstants.failure})
    }
  }

  updateActiveOptionId = languageStatusId => {
    this.setState({languageStatusId}, this.getGithubPopularRepos)
  }

  renderLanguageList = () => {
    const {languageList} = this.state
    return (
      <ul className="products-list">
        {languageList.map(product => (
          <RepositoryItem productData={product} key={product.id} />
        ))}
      </ul>
    )
  }

  renderLanguageFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="failure-img"
    />
  )

  renderLoadingView = () => (
    <div className="product-loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  conditionContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case languageConstants.success:
        return this.renderLanguageList()
      case languageConstants.failure:
        return this.renderLanguageFailureView()
      case languageConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {languageStatusId} = this.state
    return (
      <>
        <div className="app-container">
          <div className="content-container">
            <h1 className="main-heading">Popular</h1>
            <nav className="products-header">
              <ul className="products-container">
                {languageFiltersData.map(eachItem => (
                  <LanguageFilterItem
                    ItemDetails={eachItem}
                    key={eachItem.id}
                    activeStatus={languageStatusId === eachItem.id}
                  />
                ))}
              </ul>
            </nav>

            {this.conditionContainer}
          </div>
        </div>
      </>
    )
  }
}

export default GithubPopularRepos
