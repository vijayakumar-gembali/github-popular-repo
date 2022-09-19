// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {updateActiveOptionId, itemDetails, activeStatus} = props
  const {id, language} = itemDetails

  const onClickEachItem = () => updateActiveOptionId(id)

  const colorDetails = activeStatus ? 'button' : 'heading'

  return (
    <li className={colorDetails} key={id} onClick={onClickEachItem()}>
      {language}
    </li>
  )
}
export default LanguageFilterItem
