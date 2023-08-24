import React, { useState } from 'react'
import { IProduct } from './product.types'
import { AttachMoney, Close, StarSharp } from '@mui/icons-material';
import { Rating } from '@mui/material';

type ProductDetailsProps = {
    product: IProduct;
    onModalDismiss: (val: boolean) => void;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({product, onModalDismiss}) => {
    const [selectedImage, setSelectedImage] = useState(product.thumbnail)
  return (
    <div className="container">
        <div className="card">
            <div onClick={() => onModalDismiss(false)}>
                <Close/>
            </div>
            <div className="content">
                <img src={selectedImage} alt=""/>
            </div>
            <div className="content-2">
                <div className="branding">
                    <span>{product.title}</span>
                    <span>NEW</span>
                </div>
                <div className="ratings">
                    <Rating name="read-only" value={product.rating} readOnly precision={0.1} color='gold'/>
                </div>
                <h4 className='product-description'>{product.description}</h4>
                <div className="flex">
                    { product.images.map((image, index) =>
                     <div className={`thumbnail-image-container ${selectedImage === image ? 'active' : '' }`} key={index} onClick={() => setSelectedImage(image)}>
                        <img src={image}/>
                    </div>) }
                </div>
                <div className="price-container">
                    <div className='price'> 
                        <AttachMoney/>
                        <p className='actualPrice'><s>{product.price}</s></p>
                        <p className='discountedPrice'>{Number(product.price - ((product.price * product.discountPercentage) / 100)).toFixed(2)}</p>
                    </div>
                    <div>
                        <p>{product.discountPercentage}% off</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails