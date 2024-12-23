import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const ProductHeader = props => {
  const {activeOptionId, sortByOptions, updateActiveOption} = props

  const updateActiveOptionId = event => {
    updateActiveOption(event.target.value)
  }

  return (
    <div className="productHeader_container">
      <h1 className="Products_Heading">All Products</h1>
      <div className="sorting">
        <MdOutlineSort />
        <p>Sort by</p>
        <select
          value={activeOptionId}
          className="sortOptions"
          onChange={updateActiveOptionId}
        >
          {sortByOptions.map(each => (
            <option value={each.optionId}>{each.displayText}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductHeader
