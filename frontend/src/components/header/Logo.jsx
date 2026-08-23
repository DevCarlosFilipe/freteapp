import { useState } from 'react'
import { Link } from 'react-router-dom'

function Logo({ img, siteName }) {
    const [imageValid, setImageValid] = useState(Boolean(img))

    return (
        <div className="logo-container">
            <Link to="/" aria-label={siteName}>
                {imageValid ? (
                    <img
                        className="logo"
                        src={img}
                        alt={siteName}
                        onError={() => setImageValid(false)}
                    />
                ) : (
                    <h1>{siteName}</h1>
                )}
            </Link>
        </div>
    )
}

export default Logo