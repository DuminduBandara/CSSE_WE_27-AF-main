import React from 'react'
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ item }) => {
    const navigate = useNavigate();
    
    return (
        <div class="card" style={{width: '18rem'}}>
            <div class="card-body">
                <h5 class="card-title"><b>Package {item.package_no}</b></h5>
                <h6 class="card-subtitle mb-2 text-muted">{item.packagePrice}</h6>
                <p class="card-text">{item.description}</p>
                <p class="card-text">{item.price}</p>
                <button type="button" class="btn btn-dark" style={{ width:'200px' }} onClick={()=>navigate(`/package/${item._id}`)}>View Package</button>
                
            </div>
        </div>
    )
}

export default PackageCard
