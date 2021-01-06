import React from 'react'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import CollectionPreview from '../collection-preview/collection-preview.component'
import './collections-overview.styles.scss'

const CollectionsOverview = ({collections}) => (
    <div className='shop-page'>
        {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>

)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
  })

export default connect(mapStateToProps)(CollectionsOverview)