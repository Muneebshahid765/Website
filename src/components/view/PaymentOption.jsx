import React from 'react'
import "../style/PaymentOption.css"

const PaymentOption = () => {
  return (
    <>
    <section id="app-promo">
            <div className="container app-promo-container">
                <div className="app-promo-text">
                    <h2>Download The KuyaPlay App</h2>
                    <p>Experience seamless gaming on the go. Get access to exclusive promotions and a smoother, faster gameplay experience by downloading our dedicated app.</p>
                    <a href="#" className="btn btn-primary">Download Now</a>
                </div>
                <div className="app-promo-image">
                    <img src="https://placehold.co/400x450/111/fff?text=App+Screenshot" alt="KuyaPlay App on a phone"/>
                </div>
            </div>
        </section>

        <section id="payment-partners">
            <div className="container">
                <h2 className="payment-title">Our Payment Partners</h2>
                <div className="partners-logos">
                     <img src="https://placehold.co/150x50/333/ccc?text=GCash" alt="GCash Logo"/>
                     <img src="https://placehold.co/150x50/333/ccc?text=PayMaya" alt="PayMaya Logo"/>
                     <img src="https://placehold.co/150x50/333/ccc?text=BPI" alt="BPI Logo"/>
                     <img src="https://placehold.co/150x50/333/ccc?text=UnionBank" alt="UnionBank Logo"/>
                </div>
            </div>
        </section>
</>
  )
}

export default PaymentOption
